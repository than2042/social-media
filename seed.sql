CREATE TABLE
  sm_user (
    id SERIAL PRIMARY KEY,
    username varchar(40) not null,
    bio varchar(40) not null,
    clerk_user_id text
  )

CREATE TABLE sm_post (
    id SERIAL PRIMARY KEY,
    content TEXT,
    sm_user_id INTEGER REFERENCES sm_user(id), 
    sm_like_id INTEGER REFERENCES sm_like(likeId),
    follower_id INTEGER REFERENCES follower(followerId)
  )

CREATE TABLE
  sm_like (
    id SERIAL PRIMARY KEY,
     sm_post_id INTEGER REFERENCES sm_post(id)
  )

  CREATE TABLE
  follower (
    id SERIAL PRIMARY KEY,
     sm_user_id INTEGER REFERENCES sm_user(id)
  )

-- drop column form talbe
ALTER TABLE sm_post
DROP sm_user_id;

-- add column table
ALTER TABLE sm_post
ADD  sm_like_id INTEGER REFERENCES sm_like(id)

ALTER TABLE sm_post
ADD follower_id INTEGER REFERENCES follower(id)  

-- deleteing table
drop table sm_user 