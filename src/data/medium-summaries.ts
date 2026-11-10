// One-line summaries shown on the Writing page cards, keyed by Medium post id
// (the code at the end of a post's URL, also the `id` in medium-posts.json).
// A post with no entry here shows the opening sentences of the post instead.
export const mediumSummaries: Record<string, string> = {
  // Building a Scalable E-commerce Payment service
  "0a0ca70c6440":
    "A system design walkthrough of a payment service built for reliability: data model, APIs, capacity estimates and the full card-payment flow from checkout to merchant settlement.",

  // Designing Resilient Event-Driven Systems that Scale
  "03da6c60b711":
    "Why event-driven systems that look clean on a diagram struggle in production, and how queue isolation, batch sizing and the right metrics keep backlogs and noisy neighbors in check.",

  // Culture of Extreme Documentation: An Engineering Superpower
  "c3155027aa3f":
    "How design docs, public channels and written RCAs stop repeated explanations, speed up onboarding and turn tribal knowledge into lasting team memory.",

  // Faster Database Queries: Practical Techniques
  "074ba9afdaa3":
    "Lessons from tuning Target's job-orchestration platform for peak sales: choosing the right database, indexing, finding slow queries, caching, tail latency and batching.",

  // Reliability as a First-Class Citizen: Patterns for Zero-Downtime Applications
  "bd65ab679efa":
    "Patterns for near-zero downtime at every stage: removing single points of failure in design, handling errors deliberately in code, and shipping safely with feature flags and runbooks.",

  // Scaling Prometheus: Managing 80M Metrics Smoothly
  "8d8bac940ff3":
    "How Flipkart's API gateway moved from StatsD to federated Prometheus to handle 80 million time series from 2,000 instances, and how aggregation keeps cardinality and storage in check.",

  // Thinking in Scalability: Pragmatic Decisions at Peak Load
  "92475cd7447c":
    "Getting a distributed system ready for peak traffic: instrument everything, load test early, find the real bottleneck, choose between scaling up and out, and avoid cold starts.",

  // 8 Habits to Keep Big Projects Moving as an Individual Contributor
  "d85b91c22eed":
    "Eight habits from cross-team projects at Flipkart, from questioning plans early and closing every loop to logging decisions and keeping stakeholders informed.",

  // Foundations of Golang: A Four-Week Kick-Start
  "f261625314df":
    "A four-week plan for experienced developers to get fluent in Go: why the language is worth learning, then week by week through the basics, concurrency, tooling and hands-on practice.",

  // Scaling Infrastructure as Code with Terraform and Atlantis
  "db5d6df20498":
    "Making infrastructure changes safe at scale with Terraform and Atlantis, so every change is reviewed and applied through a pull request instead of from an engineer's laptop.",
};
