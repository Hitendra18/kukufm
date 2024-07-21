create table audiobook (
	id serial primary key,
	title varchar(200) not null,
	author_name varchar(100) not null,
	category varchar(100) not null,
	description text not null,
	language varchar(100) not null,
	cover_url text not null default 'https://picsum.photos/400',
	created_at timestamp not null default current_timestamp
);

COPY audiobook (title, author_name, category, description, language, cover_url, created_at)
FROM 'D:/SOFTWARE/kuku-fm/mock-data/audiobook.csv'
DELIMITER ','
CSV HEADER;

-- select * from audiobook;

----------------------------------------------------------------

create table chapter (
	id serial primary key,
	audiobook_id int not null,
	foreign key (audiobook_id) references audiobook (id) on delete cascade,
	chapter_name varchar(100) not null,
	duration INTERVAL NOT NULL,
	media_url text not null 
		default 'https://res.cloudinary.com/dfbdnx8nq/video/upload/v1721354622/modus_l4lr7d.mp3'
);

COPY chapter (audiobook_id, chapter_name, duration, media_url)
FROM 'D:/SOFTWARE/kuku-fm/mock-data/chapter.csv'
DELIMITER ','
CSV HEADER;

-- select * from chapter;

--------------------------------------------------------------------
create table review (
	id serial primary key,
	audiobook_id int not null,
	foreign key (audiobook_id) references audiobook (id) on delete cascade,
	full_name varchar(100) not null,
	avatar text not null default 'https://picsum.photos/400',
	review_text text default null,
	rating int check (rating>=1 and rating<=5),
	created_at timestamp not null default current_timestamp
);

COPY review (audiobook_id, full_name, avatar, review_text, rating, created_at)
FROM 'D:/SOFTWARE/kuku-fm/mock-data/review.csv'
DELIMITER ','
CSV HEADER;

select * from review;



-----------------------------------------------------------------------

create view view_audiobook
as
with review_cte as
(
select a.id as audiobook_id,
	count(r.id) as rating_count,
	round(avg(r.rating), 2) as rating
from audiobook as a
left join review as r
on a.id = r.audiobook_id
group by a.id
),
chapter_cte as
(
select a.id as audiobook_id,
	count(c.id) as chapter_count,
	sum(c.duration) as total_duration
from audiobook as a
left join chapter as c
on a.id = c.audiobook_id
group by a.id
)
select a.id as id,
	a.title as title, 
	a.author_name as author_name, 
	a.category as category, 
	a.description as description, 
	a.language as language, 
	a.cover_url as cover_url,
	a.created_at as created_at,
	r.rating_count as rating_count,
	r.rating as rating,
	c.chapter_count as chapter_count,
	c.total_duration as total_duration,
	row_number() over(partition by a.category order by r.rating*r.rating_count desc) as category_rank
from audiobook as a
left join review_cte as r
on a.id = r.audiobook_id
left join chapter_cte as c
on a.id=c.audiobook_id;

select * from view_audiobook;