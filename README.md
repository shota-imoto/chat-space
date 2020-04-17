# README

<!-- DB設計 ここから -->

## users テーブル

| Column   | Type   | Options                   |
| -------- | ------ | ------------------------- |
| name     | string | null: false, unique: true |
| email    | string | null: false, unique: true |
| password | string | null: false, unique: true |

### Association

- has_many :groups, through: :users_groups
- has_many :messages

## groups テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

- has_many :users, through: :users_groups
- has_many :messages

## users_groups テーブル

| Column   | Type    | Options                                      |
| -------- | ------- | -------------------------------------------- |
| user_id  | integer | null: false, foreign_key: true, unique: true |
| group_id | integer | null: false, foreign_key: true, unique: true |

### Association

- belong_to :group
- belong_to :user

### AddIndex

- add_index users_groups,[:user_id, :group_id]

## messages テーブル

| Column    | Type    | Options                                      |
| --------- | ------- | -------------------------------------------- |
| text      | text    | null: false                                  |
| image_url | text    |                                              |
| user_id   | integer | null: false, foreign_key: true, unique: true |
| group_id  | integer | null: false, foreign_key: true, unique: true |

### Association

- belongs_to :user
- belongs_to :group

### AddIndex

- add_index users_groups,[:user_id, :group_id]

<!-- DB設計 ここまで -->

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
