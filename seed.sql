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

-- junction query

SELECT sm_like.id, sm_user.username
FROM sm_like
INNER JOIN sm_user
ON sm_like.sm_user_id = sm_user.clerk_user_id;

SELECT * FROM sm_comment WHERE id = id

-- drop column form talbe
ALTER TABLE sm_post
DROP sm_user_id;

-- add column table
ALTER TABLE sm_post
ADD  sm_like_id INTEGER REFERENCES sm_like(id)

ALTER TABLE sm_post
ADD follower_id INTEGER REFERENCES follower(id)  

-- delete table
drop table sm_user 

-- delete row
DELETE FROM sm_user WHERE id = 2

-- delete foreign key id
 DELETE FROM sm_post
 WHERE follower_id = 1;

-- delete multiple id
 DELETE FROM sm_like
 WHERE id Between 1 and 14;

  DELETE FROM follower
 WHERE sm_user_id = 7

INSERT INTO follower(id, sm_user_id) VALUES(1, 7);
INSERT INTO sm_like(id, sm_post_id) VALUES(1, 1);