# Uptime Monitor (TEST PLAYGROUND)

This document is used for a playground preliminary test for creating a custom uptime monitor.

---

## Database Design (Database Name: "site_monitors")

**Tables:**

- `sites`: this are the site entries to monitor.
- `interval_types`: set of interval types (ie 'recurring', 'one-time' etc).
- `interval_frequencies`: set of interval frequency options (ie 15 mins, 30 mins etc).
- `site_checks`: historical record of each ping status check made & it's response and metadata.

## Table Definitions & Structure

**`sites`**

```sql
CREATE TABLE sites (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(50),
  url VARCHAR(100),
  interval_type_id INT NOT NULL,
  interval_frequency_id INT,
  start_date DATE,
  end_date DATE,
  contact_email VARCHAR(100) UNIQUE,
  contact_enabled BOOLEAN,
  is_active BOOLEAN
);
```

---

**`interval_types`**

```sql
CREATE TABLE interval_types (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  description VARCHAR(100),
  is_active BOOLEAN
);
```

---

**`interval_frequencies`**

```sql
CREATE TABLE interval_frequencies (
  ID SERIAL PRIMARY KEY,
  frequency INT NOT NULL,
  description VARCHAR(100),
  is_active BOOLEAN
);
```

---

**`site_checks`** (maybe change table name???)

```sql
CREATE TABLE site_checks (
  ID SERIAL PRIMARY KEY,
  site_id INT NOT NULL,
  date_created DATE NOT NULL,
  response_time INT,
  status_info TEXT,
  was_successful BOOLEAN,
);
```

---

---

## SQL Data Commands for This Database

**Insert Interval Types and Frequencies:**

```sql
-- insert interval types (ie 'one-time, 'recurring')
INSERT INTO interval_types (name, description, is_active)
  VALUES ('One Time', 'A one-time ping.', true), ('Recurring', 'A recurring ping.', true);

-- insert interval frequencies (ie 15, 30, 60, 180 mins)
INSERT INTO interval_frequencies (frequency, description, is_active)
  VALUES (15, '15 minutes', true), (30, '30 minutes', true), (60, '60 minutes', true), (180, '180 minutes', true);

-------------------------------------------------
--------- INSERT DUMMY DATA FOR TESTING ---------
-------------------------------------------------


-- insert demo sites (porfolio site)
INSERT INTO sites (name, url, interval_type_id, interval_frequency_id, start_date, end_date, contact_email, contact_enabled, is_active)
  VALUES ('Personal Portolio Site', 'https://sgore.dev', 2, 3, '2021-8-28', null, 'estengrove99@gmail.com', true, true);
-- insert demo sites (blog site)
INSERT INTO sites (name, url, interval_type_id, interval_frequency_id, start_date, end_date, contact_email, contact_enabled, is_active)
  VALUES ('Dev/Blog Site', 'https://blog.sgore.dev', 1, null, '2021-9-1', null, 'echo.alchemist.design@gmail.com', true, true);
-- insert demo sites (blog site)
INSERT INTO sites (name, url, interval_type_id, interval_frequency_id, start_date, end_date, contact_email, contact_enabled, is_active)
  VALUES ('Dummy Example', 'https://echo-alchemist.com', 1, null, '2021-8-30', null, 'steven@aladvantage.com', false, true);
```

**Check Inserted Data is Correct:**

```sql
SELECT * FROM sites;
SELECT * FROM interval_types;
SELECT * FROM interval_frequencies;
SELECT * FROM site_checks;
```
