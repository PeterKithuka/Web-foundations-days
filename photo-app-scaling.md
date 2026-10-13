# SnapShare Scaling Plan

## Assumptions
- 10 million registered users
- 10% active daily → 1 million active users/day
- Each active user uploads 1 photo/day → ~11.6 uploads/second
- Each active user views 50 feed pages/day → 50 million views/day → ~578 views/second
- Average photo size: 2 MB
- Each photo also gets a thumbnail (~0.2 MB)

## Estimates
- **Uploads per second:** ~12
- **Feed views per second:** ~580
- **Storage per year:** 365 million photos × 2 MB = ~730 TB (plus ~73 TB thumbnails)

## Read vs Write
The system is **read-heavy**: ~580 feed views/sec vs ~12 uploads/sec.

## Architecture Diagram (text)


## Component Explanations
- **CDN:** Reduces latency and offloads traffic by caching photos near users.
- **Load Balancer:** Distributes incoming requests across app servers.
- **App Servers:** Process uploads, feed requests, and business logic.
- **Cache:** Speeds up feed queries by storing recent results in memory.
- **Database:** Stores user accounts, follows, metadata; ensures consistency.
- **Read Replica:** Handles heavy read traffic without overloading the primary DB.
- **Object Storage:** Stores large photo files reliably and cheaply.
- **Queue:** Decouples photo upload from thumbnail generation.
- **Worker:** Consumes queue tasks to generate thumbnails asynchronously.

## Upload Flow
1. User uploads a photo via app server.
2. App server saves metadata to database.
3. Photo file stored in object storage.
4. Upload request enqueues a thumbnail job.
5. Worker processes queue, generates thumbnail, saves to object storage.
6. Feed cache/database updated with new photo reference.
7. CDN serves photo and thumbnail to followers.

## Trade-offs
- **Consistency vs Performance:** Using a cache and read replicas improves speed but may serve slightly stale data.
- **Storage Cost vs Availability:** Object storage is cheap and scalable, but retrieving large files may add latency compared to a database blob store.