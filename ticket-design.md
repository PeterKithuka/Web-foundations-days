# TicketHub Design Document

## 1. Requirements
**Functional**
- Users can browse concerts and events.
- Users can select seats and purchase tickets securely.
- Prevent double-booking of the same seat.
- Provide confirmation and digital ticket delivery.
- Admins can add events and manage seat inventory.

**Non-functional**
- High availability during peak sales.
- Scalability to handle traffic spikes.
- Strong consistency for seat reservations.
- Secure payment processing.
- Low latency for browsing and checkout.

## 2. Estimates
- Registered users: 2 million
- Normal day: 50,000 visitors × 10 pages = 500,000 page views/day (~6 views/sec)
- Normal sales: 5,000 tickets/day (~0.06 tickets/sec)
- Popular concert: 200,000 users in 10 minutes → ~333 requests/sec
- Popular concert sales: 20,000 tickets in 10 minutes → ~33 tickets/sec

## 3. API Endpoints
- **GET /events** – List all upcoming events (200 OK)
- **GET /events/{id}/seats** – Show available seats for an event (200 OK)
- **POST /events/{id}/reserve** – Reserve a seat temporarily (201 Created)
- **POST /events/{id}/purchase** – Complete ticket purchase (201 Created)
- **DELETE /reservations/{id}** – Cancel a reservation (204 No Content)

## 4. Data Model
Tables:
- **users** (id PK, name, email UNIQUE, password_hash)
- **events** (id PK, title, date, venue)
- **seats** (id PK, event_id FK, seat_number, status)
- **tickets** (id PK, user_id FK, seat_id FK, purchase_time)

Relationships:
- One user → many tickets.
- One event → many seats.
- One seat → one ticket (enforced by FK).
- Many-to-many between users and events via tickets.

## 5. Architecture Diagram
**Component explanations:**
- **Client:** User’s browser or app.
- **DNS:** Resolves domain names.
- **CDN:** Serves static content quickly.
- **Load Balancer:** Distributes traffic across servers.
- **App Servers:** Handle reservations, purchases, and business logic.
- **Cache:** Stores seat availability for fast reads.
- **Database:** Stores users, events, seats, tickets.
- **Read Replica:** Handles read-heavy traffic.
- **Queue & Worker:** Asynchronous tasks like sending emails.
- **Payment Gateway:** Secure external payment processing.

## 6. Preventing Double Booking
- Seat reservations use **transactions with row-level locks**.
- When a user reserves a seat, its status changes to “reserved” immediately.
- Only one transaction can update a seat at a time.
- Reservation expires after a short timeout if not purchased.

## 7. Trade-offs
- **Strong consistency vs performance:** Locking seats ensures correctness but may slow peak performance.
- **Cache freshness vs DB load:** Using cache reduces DB load but risks stale seat data; solved by invalidating cache on reservation changes.