DROP TABLE IF EXISTS snippets;
-- Create table
CREATE TABLE snippets (
  id SERIAL NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT 'Untitled' ,
  createdAt BIGINT NOT NULL DEFAULT date_part('epoch', now()),
  text TEXT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO snippets VALUES 
  (DEFAULT, 'My first snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My second snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My third snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My fourth snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My fifth snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My sixth snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My seventh snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My eigth snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My ninth snippet', DEFAULT, 'Hello world'),
(DEFAULT, 'My tenth snippet', DEFAULT, 'Hello world');
