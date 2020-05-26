const sampleData = `Workout Timestamp,Live/On-Demand,Instructor Name,Length (minutes),Fitness Discipline,Type,Title,Class Timestamp,Total Output,Avg. Watts,Avg. Resistance,Avg. Cadence (RPM),Avg. Speed (kph),Distance (km),Calories Burned,Avg. Heartrate,Avg. Incline,Avg. Pace (min/km)
2018-03-20 19:58 (PDT),On Demand,Jennifer Jacobs,30,Cycling,Beginner,30 min Advanced Beginner Ride,2017-10-03 07:21 (PDT),303,169,47%,82,31.61,15.79,370,128.53,,
2018-03-21 20:12 (PDT),On Demand,Ally Love,30,Cycling,Theme,30 min Pop Ride,2018-03-14 10:19 (PDT),273,152,46%,79,30.32,15.14,453,146.40,,
2018-03-24 14:46 (PDT),On Demand,Steven Little,30,Cycling,Metrics,30 min Metrics Ride,2017-04-24 08:19 (PDT),333,185,44%,93,32.98,16.48,402,135.41,,
2018-03-24 15:18 (PDT),On Demand,Alex Toussaint,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-03-06 12:10 (PDT),,,,,,,64,131.99,,
2018-03-25 17:28 (PDT),On Demand,Denis Morton,30,Cycling,Intervals,30 min HIIT Ride,2018-03-19 08:19 (PDT),323,180,45%,90,32.43,16.19,374,129.24,,
2018-03-25 18:01 (PDT),On Demand,Jess King,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-03-05 12:00 (PDT),,,,,,,49,111.67,,
2018-03-27 21:41 (PDT),On Demand,Robin Arzon,30,Cycling,Climb,30 min Climb Ride,2017-05-03 08:19 (PDT),342,190,52%,76,33.10,16.53,429,141.15,,
2018-03-27 22:13 (PDT),On Demand,Robin Arzon,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-02-27 11:56 (PDT),,,,,,,57,123.14,,
2018-03-29 22:39 (PDT),On Demand,Alex Toussaint,30,Cycling,Intervals,30 min HIIT Ride,2018-02-24 12:22 (PDT),334,186,47%,87,32.85,16.40,405,136.07,,
2018-03-29 23:12 (PDT),On Demand,Alex Toussaint,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-03-06 12:10 (PDT),,,,,,,57,123.01,,
2018-04-05 22:12 (PDT),On Demand,Steven Little,30,Cycling,Heart Rate Zone,30 min HRZ Max Capacity Ride,2016-12-05 08:17 (PDT),387,215,56%,75,34.91,17.43,385,131.58,,
2018-04-05 22:45 (PDT),On Demand,Alex Toussaint,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-03-06 12:10 (PDT),,,,,,,59,125.02,,
2018-04-08 09:45 (PDT),Live,Emma Lovewell,45,Cycling,Theme,45 min Y2K Pop Ride,2018-04-08 09:33 (PDT),497,184,51%,78,32.89,24.67,660,143.36,,
2018-04-08 10:33 (PDT),On Demand,Emma Lovewell,5,Stretching,Full Body Stretch,5 min Groove: Stretch,2018-04-05 12:11 (PDT),,,,,,,56,121.29,,
2018-04-09 21:31 (PDT),On Demand,Emma Lovewell,45,Cycling,Live DJ,45 min Live DJ Ride,2018-04-08 14:49 (PDT),538,199,52%,79,33.86,25.38,680,146.31,,
2018-04-09 22:19 (PDT),On Demand,Alex Toussaint,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-03-06 12:10 (PDT),,,,,,,59,125.75,,
2018-04-10 21:13 (PDT),On Demand,Matt Wilpers,45,Cycling,Power Zone,45 min Power Zone Max Ride,2018-03-19 04:48 (PDT),528,196,47%,88,33.36,24.99,564,130.08,,
2018-04-10 22:01 (PDT),On Demand,Matt Wilpers,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-02-08 12:01 (PDT),,,,,,,48,111.24,,
2018-04-11 21:58 (PDT),On Demand,Matt Wilpers,20,Cycling,Power Zone,20 min FTP Test Ride,2017-10-16 12:06 (PDT),286,239,50%,92,36.69,12.21,272,136.53,,
2018-04-11 22:21 (PDT),On Demand,Alex Toussaint,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-03-06 12:10 (PDT),,,,,,,50,113.81,,
2018-04-14 21:42 (PDT),On Demand,Matt Wilpers,45,Cycling,Power Zone,45 min Power Zone Ride,2018-04-12 02:47 (PDT),558,207,49%,86,34.49,25.85,579,131.85,,
2018-04-14 22:30 (PDT),On Demand,Jenn Sherman,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2018-03-08 12:24 (PDT),,,,,,,53,117.78,,
2018-04-15 22:19 (PDT),On Demand,Ally Love,45,Cycling,Theme,45 min 90s Ride,2018-04-15 05:19 (PDT),517,192,51%,79,33.55,25.14,607,135.82,,
2020-04-25 07:33 (PDT),On Demand,Robin Arzon,5,Stretching,Pre & Post-Ride Stretch,5 min Post-Ride Stretch,2020-01-10 12:33 (PDT),,,,,,,32,94.11,,`

const sampleClassData = `{
    "data": [
        {
            "class_type_ids": [
                "a2ee6b0a98e2431baf60e5261b8605e2"
            ],
            "content_provider": "peloton",
            "content_format": "video",
            "description": "Our coaches are joined in the studio by a live DJ in these infectiously energetic rides. Ride along as these top industry talents creatively mix up curated playlists of fan favorites and the hottest new tracks. ",
            "difficulty_estimate": 7.7826,
            "overall_estimate": 0.9738,
            "difficulty_rating_avg": 7.7826,
            "difficulty_rating_count": 253,
            "difficulty_level": null,
            "duration": 2700,
            "equipment_ids": [],
            "equipment_tags": [],
            "extra_images": [],
            "fitness_discipline": "cycling",
            "fitness_discipline_display_name": "Cycling",
            "has_closed_captions": false,
            "has_pedaling_metrics": true,
            "home_peloton_id": "6f6f6cf610c04b73b876ffe8b17cb946",
            "id": "f7756441dc5f4d9e8c1dd64cd4183fe8",
            "image_url": "https://s3.amazonaws.com/peloton-ride-images/d48dd84ce8bb8962bdfaccf5c3a2943e669da480/img_1425760904713.jpg",
            "instructor_id": "048f0ce00edb4427b2dced6cbeb107fd",
            "is_archived": true,
            "is_closed_caption_shown": false,
            "is_explicit": true,
            "has_free_mode": false,
            "is_live_in_studio_only": false,
            "language": "english",
            "origin_locale": "en-US",
            "length": 3009,
            "live_stream_id": "f7756441dc5f4d9e8c1dd64cd4183fe8-live",
            "live_stream_url": null,
            "location": "nyc",
            "metrics": [
                "heart_rate",
                "cadence",
                "calories"
            ],
            "original_air_time": 1425680400,
            "overall_rating_avg": 0.9738,
            "overall_rating_count": 573,
            "pedaling_start_offset": 60,
            "pedaling_end_offset": 2770,
            "pedaling_duration": 2710,
            "rating": 242,
            "ride_type_id": "ç",
            "ride_type_ids": [
                "a2ee6b0a98e2431baf60e5261b8605e2"
            ],
            "sample_vod_stream_url": null,
            "scheduled_start_time": 1425681900,
            "series_id": "ç",
            "sold_out": true,
            "studio_peloton_id": "f1a8f9ee0ef745c9a39d42d3b76b9043",
            "title": "45 min Live DJ Ride",
            "total_ratings": 256,
            "total_in_progress_workouts": 0,
            "total_workouts": 999,
            "vod_stream_url": null,
            "vod_stream_id": "f7756441dc5f4d9e8c1dd64cd4183fe8-vod",
            "captions": [],
            "total_user_workouts": 0,
            "total_following_workouts": 0,
            "is_favorite": false
        },
        {
            "class_type_ids": [
                "9f9be657134e4d868d76ae4988da01f1"
            ],
            "content_provider": "peloton",
            "content_format": "video",
            "description": "Jess will take you on the Peloton journey of a lifetime, if you're ready to get started. In her Beginner Ride, expect to get a quick lesson in form, technique, and cycling terminology, and get to know Jess along the way!",
            "difficulty_estimate": 6.2073,
            "overall_estimate": 0.9839,
            "difficulty_rating_avg": 6.2073,
            "difficulty_rating_count": 1785,
            "difficulty_level": null,
            "duration": 1200,
            "equipment_ids": [],
            "equipment_tags": [],
            "extra_images": [],
            "fitness_discipline": "cycling",
            "fitness_discipline_display_name": "Cycling",
            "has_closed_captions": false,
            "has_pedaling_metrics": true,
            "home_peloton_id": null,
            "id": "6d3ac83d61274d18b87335ec93a1daa2",
            "image_url": "https://s3.amazonaws.com/peloton-ride-images/8df38fd48a2e76f1875cb24d3de70c7c7d5d42ff/img_1425933533388.jpg",
            "instructor_id": "048f0ce00edb4427b2dced6cbeb107fd",
            "is_archived": true,
            "is_closed_caption_shown": false,
            "is_explicit": true,
            "has_free_mode": false,
            "is_live_in_studio_only": false,
            "language": "english",
            "origin_locale": "en-US",
            "length": 1322,
            "live_stream_id": "6d3ac83d61274d18b87335ec93a1daa2-live",
            "live_stream_url": null,
            "location": "nyc",
            "metrics": [
                "heart_rate",
                "cadence",
                "calories"
            ],
            "original_air_time": 1425933000,
            "overall_rating_avg": 0.9839,
            "overall_rating_count": 2740,
            "pedaling_start_offset": 1,
            "pedaling_end_offset": 1235,
            "pedaling_duration": 1234,
            "rating": 387,
            "ride_type_id": "9f9be657134e4d868d76ae4988da01f1",
            "ride_type_ids": [
                "9f9be657134e4d868d76ae4988da01f1"
            ],
            "sample_vod_stream_url": null,
            "scheduled_start_time": 1425933000,
            "series_id": "777cc4f5902a4ef69b718284c5a288df",
            "sold_out": false,
            "studio_peloton_id": null,
            "title": "20 min Beginner Ride",
            "total_ratings": 403,
            "total_in_progress_workouts": 0,
            "total_workouts": 3740,
            "vod_stream_url": null,
            "vod_stream_id": "6d3ac83d61274d18b87335ec93a1daa2-vod",
            "captions": [],
            "total_user_workouts": 0,
            "total_following_workouts": 0,
            "is_favorite": false
        }
    ],
    "page": 2,
    "total": 6860,
    "count": 2,
    "page_count": 3430,
    "show_previous": true,
    "show_next": true,
    "sort_by": [
        "original_air_time"
    ],
    "instructors": [
        {
            "id": "048f0ce00edb4427b2dced6cbeb107fd",
            "bio": "Jess is a charismatic instructor with a boundless energy and passion for movement. With a background in dance, performance and fitness, Jess grew up down South and moved to NYC to commit to a career in wellness. Jess’s self-proclaimed sassy and spicy personality make her Peloton classes uplifting and full of exciting surprises. Jess is committed to helping people heal from the inside out, and she believes that the Peloton Bike is the perfect place to start that journey. Her focus is to partner with motivated individuals looking to transform their lives — and together, they burn.",
            "short_bio": "I am the magma from the Earth’s core that ignites the fire of transformation in myself and others.",
            "coach_type": "peloton_coach",
            "is_filterable": true,
            "is_instructor_group": false,
            "is_visible": true,
            "list_order": 24,
            "featured_profile": true,
            "film_link": "",
            "facebook_fan_page": "https://www.facebook.com/jesskingfitness/",
            "music_bio": "Check out a sample of Jess's current class playlist.",
            "spotify_playlist_uri": "spotify:user:onepeloton:playlist:395EUHdMxn1TCwI1G5yWHk",
            "background": "Sweat is the special sauce that bridges the gap between our inner and outer worlds. I approach every ride as an opportunity to change my life. We are transforming together, in real time.",
            "ordered_q_and_as": [
                [
                    "How Do You Motivate?",
                    "I lead from the perspective that you are whole now, and everything you need to get through the ride, your day, or whatever you’re confronting, is already inside of you."
                ],
                [
                    "Outside of Peloton",
                    "I have a customized wellness transformation program called MindFULL3 centered around nourishment, movement and process. Through conversation and communal support, we help you design the life you were meant to lead."
                ],
                [
                    "",
                    ""
                ]
            ],
            "instagram_profile": "",
            "strava_profile": "",
            "twitter_profile": "",
            "quote": "I am the magma from the Earth’s core that ignites the fire of transformation in myself and others.",
            "username": "JessicaKing",
            "name": "Jess King",
            "first_name": "Jess",
            "last_name": "King",
            "user_id": "7ec21aa09c254638a6fa36e47e5dd12d",
            "life_style_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/504c95bf2f7a4fa9a0aa93dcc59ce6d5",
            "bike_instructor_list_display_image_url": null,
            "web_instructor_list_display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/fe75a4ff50034cb28fbba68d078af2ef",
            "ios_instructor_list_display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/c63a41b76cf1403ba436cad25db56162",
            "about_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/92100e680ddb41cfa850d7e162a889d6",
            "image_url": "https://s3.amazonaws.com/workout-metric-images-prod/f94160a5f6e14445840c8f60b5f86ae8",
            "jumbotron_url": null,
            "jumbotron_url_dark": "https://s3.amazonaws.com/workout-metric-images-prod/aa8620e6ff6b431b9ba4999697be9ab1",
            "jumbotron_url_ios": "https://s3.amazonaws.com/workout-metric-images-prod/79eee02695b54c23ab1cf0f5055de6b1",
            "web_instructor_list_gif_image_url": null,
            "instructor_hero_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/0a3fb295ac8149b4bf4dc64a2603ea10",
            "fitness_disciplines": [
                "cycling"
            ]
        }
    ],
    "ride_types": [
        {
            "id": "a5953fd181914f4eb69e755e1fefffce",
            "name": "Family Cardio",
            "display_name": "Family",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 1
        },
        {
            "id": "1fef162e27b4413facff77cc7f766ced",
            "name": "Dance Cardio",
            "display_name": "Dance Cardio",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 2
        },
        {
            "id": "6590f6042e8e4d1d8c2f3f1a73cf1729",
            "name": "Theme (Bootcamp)",
            "display_name": "Theme",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 3
        },
        {
            "id": "b0a7fc01affb4249aca872a046c6a344",
            "name": "Bodyweight (Bootcamp)",
            "display_name": "Bodyweight",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 4
        },
        {
            "id": "209458d0f8c84614aa96537f7fff403f",
            "name": "Walking Bootcamp",
            "display_name": "Low Impact",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 5
        },
        {
            "id": "3c65fba3c4a64e2db9a12776e09bc883",
            "name": "Body Focus (Bootcamp)",
            "display_name": "Body Focus",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 6
        },
        {
            "id": "b70f0feabd7043cfa1c5f7e9f73b43d5",
            "name": "Heart Rate Bootcamp",
            "display_name": "Heart Rate Zone",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 7
        },
        {
            "id": "919794060b734915b13ddee4e7e39084",
            "name": "Running Skills",
            "display_name": "Running Skills",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 8
        },
        {
            "id": "c0681493aaeb4029b01f64a6c9ff3e0e",
            "name": "Warm Up/Cool Down Running",
            "display_name": "Warm Up/Cool Down",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 9
        },
        {
            "id": "feda7eed0d8247f2868314eaa74f37fd",
            "name": "Fun Run",
            "display_name": "Fun Run",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 10
        },
        {
            "id": "19efefbcf7394ff8bac0ac89a674c545",
            "name": "Endurance",
            "display_name": "Endurance",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 11
        },
        {
            "id": "a81cd52ccc3140edb1fbf28dbf880791",
            "name": "Speed Running",
            "display_name": "Speed",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 12
        },
        {
            "id": "e2a1f782a89e45abacd962f5aa105990",
            "name": "Intervals Running",
            "display_name": "Intervals",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 13
        },
        {
            "id": "85724534f42b490ca1c4fdd4c4d35cf1",
            "name": "Heart Rate Running",
            "display_name": "Heart Rate Zone",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 14
        },
        {
            "id": "5ce29a5ff8524bba9132cff42e5cbedd",
            "name": "Warm Up/Cool Down Walking",
            "display_name": "Warm Up/Cool Down",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 15
        },
        {
            "id": "d84d91191eb54d4aa265f82fe3375b92",
            "name": "Fun Walk",
            "display_name": "Fun Walk",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 16
        },
        {
            "id": "da49e151806f426090da2004997d3238",
            "name": "Power Walking",
            "display_name": "Power Walk",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 17
        },
        {
            "id": "ca0daca029914c8ba83de0e1543001b3",
            "name": "Hiking Walking",
            "display_name": "Hiking",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 18
        },
        {
            "id": "e65de89202dc4d2f853ded0f4daa7c15",
            "name": "Walk + Run",
            "display_name": "Walk + Run",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 19
        },
        {
            "id": "50026a12cfcb4be09d2ec1cdda6dbeeb",
            "name": "Strength Skills",
            "display_name": "Strength Skills",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 20
        },
        {
            "id": "b6d28ceb6d1448b4b9cc6f0bb97dd78f",
            "name": "Bodyweight (Strength & toning)",
            "display_name": "Bodyweight",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 21
        },
        {
            "id": "b9022fc339ba4e6b95f19cb395bd6b71",
            "name": "Full Body (Strength & Toning)",
            "display_name": "Full Body",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 22
        },
        {
            "id": "d2f2f12b633140079d03291738cec418",
            "name": "Upper Body (strength & toning)",
            "display_name": "Upper Body",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 23
        },
        {
            "id": "3e8ce451d5a64913aed7c5ae2d151030",
            "name": "Core (Strength & Toning)",
            "display_name": "Core",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 24
        },
        {
            "id": "af137d7195a34e7f96f4d306da554ebd",
            "name": "Lower Body (Strength & Toning)",
            "display_name": "Lower Body",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 25
        },
        {
            "id": "127c41262894455686bf11267239ba79",
            "name": "Full Body Stretch",
            "display_name": "Full Body Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 26
        },
        {
            "id": "34b647095d614f9b8c37b85100db58ce",
            "name": "Upper Body Stretch",
            "display_name": "Upper Body Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 27
        },
        {
            "id": "625597385b1040eeb18f8143cc4e5010",
            "name": "Lower Body Stretch",
            "display_name": "Lower Body Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 28
        },
        {
            "id": "736e33ce009b425e81f276cfaf42b5d3",
            "name": "Pre & Post-Ride Stretch",
            "display_name": "Pre & Post-Ride Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 29
        },
        {
            "id": "b6885c9659f04a308164d9809bf58acb",
            "name": "Pre & Post-Run Stretch",
            "display_name": "Pre & Post-Run Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 30
        },
        {
            "id": "ca63751ab3f1430fb31d1d06e5d34804",
            "name": "OUTDOOR Warm Up Cool Down",
            "display_name": "Warm Up/Cool Down",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 31
        },
        {
            "id": "9dc3be9eaafb476d8853f90cd33e6e04",
            "name": "OUTDOOR Walking",
            "display_name": "Walking",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 32
        },
        {
            "id": "69c8c93acf3e46b290694e69ca8db450",
            "name": "OUTDOOR Fun Run",
            "display_name": "Fun Run",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 33
        },
        {
            "id": "23732a102a5f425db1ddaff21e35405e",
            "name": "OUTDOOR Endurance Running",
            "display_name": "Endurance",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 34
        },
        {
            "id": "db1f7d7342c844a79f2621ab3d4bc183",
            "name": "OUTDOOR Speed Training",
            "display_name": "Speed",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 35
        },
        {
            "id": "ee0b994867b946728e880e96297a180e",
            "name": "OUTDOOR Intervals Running",
            "display_name": "Intervals",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 36
        },
        {
            "id": "33b4257b1b774511945183dbf7cb2db0",
            "name": "Fitness Focus",
            "display_name": "Fitness Focus",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 37
        },
        {
            "id": "24fcd278f49d4f8692879b3dbfa52081",
            "name": "Meditation Basics",
            "display_name": "Meditation Basics",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 38
        },
        {
            "id": "4b09fff90e954436b189f1e593c5db51",
            "name": "Mindfulness",
            "display_name": "Mindfulness",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 39
        },
        {
            "id": "1fe59d5407c243f987d9050862213835",
            "name": "Relax & Sleep",
            "display_name": "Relax & Sleep",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 40
        },
        {
            "id": "d690ffee9e6743a2b3ef5ffc1b490d54",
            "name": "Meditation Anywhere",
            "display_name": "Meditation Anywhere",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 41
        },
        {
            "id": "f4cf26e6059943a0a8e3a6533bb76239",
            "name": "Emotions",
            "display_name": "Emotions",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 42
        },
        {
            "id": "ee52cd1988ca496ab7b130de8ab3d9b2",
            "name": "Zen in Ten",
            "display_name": "Zen in Ten",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 43
        },
        {
            "id": "9f9be657134e4d868d76ae4988da01f1",
            "name": "Beginner",
            "display_name": "Beginner",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 44
        },
        {
            "id": "59a49f882ea9475faa3110d50a8fb3f3",
            "name": "Low Impact",
            "display_name": "Low Impact",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 45
        },
        {
            "id": "665395ff3abf4081bf315686227d1a51",
            "name": "Power Zone",
            "display_name": "Power Zone",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 46
        },
        {
            "id": "bf6639f2e50a4f0395cb1479542ed4bd",
            "name": "Climb",
            "display_name": "Climb",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 47
        },
        {
            "id": "a2ee6b0a98e2431baf60e5261b8605e2",
            "name": "Live DJ",
            "display_name": "Live DJ",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 48
        },
        {
            "id": "7579b9edbdf9464fa19eb58193897a73",
            "name": "Intervals",
            "display_name": "Intervals",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 49
        },
        {
            "id": "8c34b36dba084e22b91426621759230d",
            "name": "Heart Rate Zone",
            "display_name": "Heart Rate Zone",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 50
        },
        {
            "id": "f10471dcd6a34e5f8ed54eb634b5df19",
            "name": "Theme",
            "display_name": "Theme",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 51
        },
        {
            "id": "9745b8e2cb274a28b096387073a5d993",
            "name": "Groove",
            "display_name": "Groove",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 52
        },
        {
            "id": "1b31748d30fa4e38b2782698bb831320",
            "name": "Metrics",
            "display_name": "Metrics",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 53
        },
        {
            "id": "4228e9e57bf64c518d58a1d0181760c4",
            "name": "Pro Cyclist",
            "display_name": "Pro Cyclist",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 54
        },
        {
            "id": "07e0a4ce14b745e9a7be6948cece8334",
            "name": "HIIT (BTR Cardio)",
            "display_name": "HIIT",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 55
        },
        {
            "id": "885fa45fc91240cca5ca96d8d0d25bff",
            "name": "Full Body (BTR Cardio)",
            "display_name": "Full Body",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 56
        },
        {
            "id": "c17def9c7b004f238a3369476b0866af",
            "name": "Low Intensity Floor",
            "display_name": "Low Intensity",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 57
        },
        {
            "id": "7761a495d2cb4775b8bb784851d10861",
            "name": "Shadowboxing (BTR Cardio)",
            "display_name": "Shadowboxing ",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 58
        },
        {
            "id": "d549728def544a848b2492a3afbd6971",
            "name": "Total Body Yoga",
            "display_name": "Total Body",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 59
        },
        {
            "id": "6b0547c130c54f88b1c85b421d53bffa",
            "name": "Yoga Basics",
            "display_name": "Yoga Basics",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 60
        },
        {
            "id": "56c834e143d4423799fc1d3f3fd70ec8",
            "name": "Yoga Flow",
            "display_name": "Yoga Flow",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 61
        },
        {
            "id": "28172f66e4824a8fbd8b756e6c265ff4",
            "name": "Power Yoga",
            "display_name": "Power Yoga",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 62
        },
        {
            "id": "9da7b05642d44ec19050fa8bc547ecc9",
            "name": "Yoga Anywhere",
            "display_name": "Yoga Anywhere",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 63
        },
        {
            "id": "8fe8155b47a64da0a50a0c314fcd393c",
            "name": "Restorative Yoga",
            "display_name": "Restorative Yoga",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 64
        },
        {
            "id": "190494e7f04f49bc8d10412b081699e3",
            "name": "Pre & Postnatal Yoga",
            "display_name": "Pre & Postnatal Yoga",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 65
        },
        {
            "id": "2476cca19b304584942b4897a33ce838",
            "name": "Bootcamp Basics",
            "display_name": "Bootcamp Basics",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 66
        },
        {
            "id": "2a33cde6c4e9440b8321b05f700e0736",
            "name": "Bike Bootcamp",
            "display_name": "Bike Bootcamp",
            "fitness_discipline": "cycling",
            "is_active": false,
            "list_order": 67
        },
        {
            "id": "cd4f646b69ab40d0837f9420a7780149",
            "name": "Beginner Circuit",
            "display_name": "Beginner",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 68
        },
        {
            "id": "6543717c3ab74feb8711f224281cdf99",
            "name": "Cardio",
            "display_name": "Cardio",
            "fitness_discipline": "cardio",
            "is_active": false,
            "list_order": 69
        },
        {
            "id": "399c3aab3d6e45e48488703a8f7b5904",
            "name": "Low Intensity Circuit",
            "display_name": "Low Intensity",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 70
        },
        {
            "id": "e47d184cc3e047d6a318a52e0f25a36d",
            "name": "OUTDOOR Run + Strength",
            "display_name": "Run + Strength",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 71
        },
        {
            "id": "0b45ef267561426fbcebedae7a7432b1",
            "name": "OUTDOOR Run + Bodyweight",
            "display_name": "Run + Bodyweight",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 72
        },
        {
            "id": "a4606e24e17142b794ccfeafe1c56e9c",
            "name": "Run + Strength",
            "display_name": "Run + Strength",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 73
        },
        {
            "id": "1a87ed4c06a74566ba7a1e4e3d68378b",
            "name": "Just Ride",
            "display_name": "Just Ride",
            "fitness_discipline": "cycling",
            "is_active": false,
            "list_order": 74
        },
        {
            "id": "3e8b662199414382be3f4bed70634f6f",
            "name": "Scenic (Cycling)",
            "display_name": "Scenic",
            "fitness_discipline": "cycling",
            "is_active": false,
            "list_order": 75
        },
        {
            "id": "9ea1256cf69b4bbe9c7b839ac704bde1",
            "name": "Guided Visualization",
            "display_name": "Guided Visualization",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 76
        },
        {
            "id": "f7e3235ac4894dcb8694d2559ea43674",
            "name": "Beginner Running",
            "display_name": "Beginner",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 77
        },
        {
            "id": "a4a28ea4bb2340bc9620a1fa3e0406d2",
            "name": "Climb Running",
            "display_name": "Climb",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 78
        },
        {
            "id": "262ab03b69ef40eebae697463c4971eb",
            "name": "Distance Running",
            "display_name": "Distance",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 79
        },
        {
            "id": "be93f3591e444631bd0e42b6d7e7fadc",
            "name": "Hill Running",
            "display_name": "Hills",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 80
        },
        {
            "id": "a8b4a232401f44d893554787d25d8e1f",
            "name": "Just Run",
            "display_name": "Just Run",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 81
        },
        {
            "id": "9474b7e53df2461b92eca7b772ed9f0e",
            "name": "Metrics Running",
            "display_name": "Metrics",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 82
        },
        {
            "id": "e40e2354fecf44258666a85973871525",
            "name": "not a class type",
            "display_name": "not a class type",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 83
        },
        {
            "id": "248e8f11ec8b490fb1b7ee540970e861",
            "name": "Pre & Post Run",
            "display_name": "Pre & Post Run",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 84
        },
        {
            "id": "f2c29be3cfc14d519c0bb9121ff69105",
            "name": "Race Prep Running",
            "display_name": "Race Prep",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 85
        },
        {
            "id": "961ee031e4774014801aea209936356f",
            "name": "Running Basics",
            "display_name": "Running Basics",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 86
        },
        {
            "id": "5fbe0d8811c543729700fe50019b5190",
            "name": "Scenic (Running)",
            "display_name": "Scenic",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 87
        },
        {
            "id": "f45e6dd7d4ab46be86a23b3f6de0eef0",
            "name": "Arms & Shoulders (strength & toning) BTR",
            "display_name": "Arms & Shoulders (strength & toning) BTR",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 88
        },
        {
            "id": "237bbfbb27aa4f5c99cfa9e04299e8ab",
            "name": "Beginner (strength & toning)",
            "display_name": "Beginner",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 89
        },
        {
            "id": "d263bc82874e44b9b7b1c450e5c03162",
            "name": "Chest & Back (Strength & Toning)",
            "display_name": "Chest & Back",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 90
        },
        {
            "id": "4eb81961bb0843798ed254770797f679",
            "name": "Strength",
            "display_name": "Strength",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 91
        },
        {
            "id": "768147e821d249038c00ae3035b2b35f",
            "name": "Toning (Strength & Toning)",
            "display_name": "Toning",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 92
        },
        {
            "id": "a46f4789f9cd431b807fe19dcd8fe7de",
            "name": "Toning",
            "display_name": "Toning",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 93
        },
        {
            "id": "11bfd07a36aa48b49a94f928287e03c0",
            "name": "Chest & Back Stretch",
            "display_name": "Chest & Back Stretch",
            "fitness_discipline": "stretching",
            "is_active": false,
            "list_order": 94
        },
        {
            "id": "47dd4476990246dd9da127f30f8f9eae",
            "name": "Post-Ride Stretch",
            "display_name": "Post-Ride Stretch",
            "fitness_discipline": "stretching",
            "is_active": false,
            "list_order": 95
        },
        {
            "id": "8fc1cbb71ba34b9485ab5d90c7bfc52b",
            "name": "Specialized Stretch",
            "display_name": "Specialized",
            "fitness_discipline": "stretching",
            "is_active": false,
            "list_order": 96
        },
        {
            "id": "e20b05ad5eb54ab09b4a13d23e73fef0",
            "name": "Stretch",
            "display_name": "Stretch",
            "fitness_discipline": "stretching",
            "is_active": false,
            "list_order": 97
        },
        {
            "id": "2be6b4aa5a894761829d077fcdc4e0c3",
            "name": "Distance Walking",
            "display_name": "Distance",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 98
        },
        {
            "id": "0d7c84da75364e399fe3cb9c264c88a7",
            "name": "Low Intensity Running/Walking",
            "display_name": "Low Intensity",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 99
        },
        {
            "id": "d501bf75043547218531aff9277c49e3",
            "name": "OUTDOOR Power Walking",
            "display_name": "Power Walk",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 100
        },
        {
            "id": "6d010722eae2493eb93408ba559e7088",
            "name": "OUTDOOR Walk + Run",
            "display_name": "Walk + Run",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 101
        },
        {
            "id": "9a87e85d85c947c0bdb1388cd4d0a605",
            "name": "OUTDOOR Walk + Strength",
            "display_name": "Walk + Strength",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 102
        },
        {
            "id": "045a943d716040d685b8e812791be267",
            "name": "Walk + Strength",
            "display_name": "Walk + Strength",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 103
        },
        {
            "id": "1675982798a84c239c552b4cac158e41",
            "name": "Beginner Yoga",
            "display_name": "Beginner",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 104
        },
        {
            "id": "991b662d3d384f1ebc403faef7088262",
            "name": "Evening Yoga",
            "display_name": "Evening",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 105
        },
        {
            "id": "5cc79a3d63e64d1f96dac2f3e7ec728b",
            "name": "Morning Yoga",
            "display_name": "Morning",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 106
        },
        {
            "id": "60567f9a9f8f401bb4e4983ebd78af4d",
            "name": "test",
            "display_name": "test",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 107
        },
        {
            "id": "a5dc4597678247ac8053287ad81fa14c",
            "name": "Yoga",
            "display_name": "Yoga",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 108
        },
        {
            "id": "e811d1b8b957496eb6bdd0f019855eab",
            "name": "Yoga on the Go",
            "display_name": "Yoga on the Go",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 109
        }
    ],
    "class_types": [
        {
            "id": "a5953fd181914f4eb69e755e1fefffce",
            "name": "Family Cardio",
            "display_name": "Family",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 1
        },
        {
            "id": "1fef162e27b4413facff77cc7f766ced",
            "name": "Dance Cardio",
            "display_name": "Dance Cardio",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 2
        },
        {
            "id": "6590f6042e8e4d1d8c2f3f1a73cf1729",
            "name": "Theme (Bootcamp)",
            "display_name": "Theme",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 3
        },
        {
            "id": "b0a7fc01affb4249aca872a046c6a344",
            "name": "Bodyweight (Bootcamp)",
            "display_name": "Bodyweight",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 4
        },
        {
            "id": "209458d0f8c84614aa96537f7fff403f",
            "name": "Walking Bootcamp",
            "display_name": "Low Impact",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 5
        },
        {
            "id": "3c65fba3c4a64e2db9a12776e09bc883",
            "name": "Body Focus (Bootcamp)",
            "display_name": "Body Focus",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 6
        },
        {
            "id": "b70f0feabd7043cfa1c5f7e9f73b43d5",
            "name": "Heart Rate Bootcamp",
            "display_name": "Heart Rate Zone",
            "fitness_discipline": "circuit",
            "is_active": true,
            "list_order": 7
        },
        {
            "id": "919794060b734915b13ddee4e7e39084",
            "name": "Running Skills",
            "display_name": "Running Skills",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 8
        },
        {
            "id": "c0681493aaeb4029b01f64a6c9ff3e0e",
            "name": "Warm Up/Cool Down Running",
            "display_name": "Warm Up/Cool Down",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 9
        },
        {
            "id": "feda7eed0d8247f2868314eaa74f37fd",
            "name": "Fun Run",
            "display_name": "Fun Run",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 10
        },
        {
            "id": "19efefbcf7394ff8bac0ac89a674c545",
            "name": "Endurance",
            "display_name": "Endurance",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 11
        },
        {
            "id": "a81cd52ccc3140edb1fbf28dbf880791",
            "name": "Speed Running",
            "display_name": "Speed",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 12
        },
        {
            "id": "e2a1f782a89e45abacd962f5aa105990",
            "name": "Intervals Running",
            "display_name": "Intervals",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 13
        },
        {
            "id": "85724534f42b490ca1c4fdd4c4d35cf1",
            "name": "Heart Rate Running",
            "display_name": "Heart Rate Zone",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 14
        },
        {
            "id": "5ce29a5ff8524bba9132cff42e5cbedd",
            "name": "Warm Up/Cool Down Walking",
            "display_name": "Warm Up/Cool Down",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 15
        },
        {
            "id": "d84d91191eb54d4aa265f82fe3375b92",
            "name": "Fun Walk",
            "display_name": "Fun Walk",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 16
        },
        {
            "id": "da49e151806f426090da2004997d3238",
            "name": "Power Walking",
            "display_name": "Power Walk",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 17
        },
        {
            "id": "ca0daca029914c8ba83de0e1543001b3",
            "name": "Hiking Walking",
            "display_name": "Hiking",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 18
        },
        {
            "id": "e65de89202dc4d2f853ded0f4daa7c15",
            "name": "Walk + Run",
            "display_name": "Walk + Run",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 19
        },
        {
            "id": "50026a12cfcb4be09d2ec1cdda6dbeeb",
            "name": "Strength Skills",
            "display_name": "Strength Skills",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 20
        },
        {
            "id": "b6d28ceb6d1448b4b9cc6f0bb97dd78f",
            "name": "Bodyweight (Strength & toning)",
            "display_name": "Bodyweight",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 21
        },
        {
            "id": "b9022fc339ba4e6b95f19cb395bd6b71",
            "name": "Full Body (Strength & Toning)",
            "display_name": "Full Body",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 22
        },
        {
            "id": "d2f2f12b633140079d03291738cec418",
            "name": "Upper Body (strength & toning)",
            "display_name": "Upper Body",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 23
        },
        {
            "id": "3e8ce451d5a64913aed7c5ae2d151030",
            "name": "Core (Strength & Toning)",
            "display_name": "Core",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 24
        },
        {
            "id": "af137d7195a34e7f96f4d306da554ebd",
            "name": "Lower Body (Strength & Toning)",
            "display_name": "Lower Body",
            "fitness_discipline": "strength",
            "is_active": true,
            "list_order": 25
        },
        {
            "id": "127c41262894455686bf11267239ba79",
            "name": "Full Body Stretch",
            "display_name": "Full Body Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 26
        },
        {
            "id": "34b647095d614f9b8c37b85100db58ce",
            "name": "Upper Body Stretch",
            "display_name": "Upper Body Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 27
        },
        {
            "id": "625597385b1040eeb18f8143cc4e5010",
            "name": "Lower Body Stretch",
            "display_name": "Lower Body Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 28
        },
        {
            "id": "736e33ce009b425e81f276cfaf42b5d3",
            "name": "Pre & Post-Ride Stretch",
            "display_name": "Pre & Post-Ride Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 29
        },
        {
            "id": "b6885c9659f04a308164d9809bf58acb",
            "name": "Pre & Post-Run Stretch",
            "display_name": "Pre & Post-Run Stretch",
            "fitness_discipline": "stretching",
            "is_active": true,
            "list_order": 30
        },
        {
            "id": "ca63751ab3f1430fb31d1d06e5d34804",
            "name": "OUTDOOR Warm Up Cool Down",
            "display_name": "Warm Up/Cool Down",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 31
        },
        {
            "id": "9dc3be9eaafb476d8853f90cd33e6e04",
            "name": "OUTDOOR Walking",
            "display_name": "Walking",
            "fitness_discipline": "walking",
            "is_active": true,
            "list_order": 32
        },
        {
            "id": "69c8c93acf3e46b290694e69ca8db450",
            "name": "OUTDOOR Fun Run",
            "display_name": "Fun Run",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 33
        },
        {
            "id": "23732a102a5f425db1ddaff21e35405e",
            "name": "OUTDOOR Endurance Running",
            "display_name": "Endurance",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 34
        },
        {
            "id": "db1f7d7342c844a79f2621ab3d4bc183",
            "name": "OUTDOOR Speed Training",
            "display_name": "Speed",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 35
        },
        {
            "id": "ee0b994867b946728e880e96297a180e",
            "name": "OUTDOOR Intervals Running",
            "display_name": "Intervals",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 36
        },
        {
            "id": "33b4257b1b774511945183dbf7cb2db0",
            "name": "Fitness Focus",
            "display_name": "Fitness Focus",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 37
        },
        {
            "id": "24fcd278f49d4f8692879b3dbfa52081",
            "name": "Meditation Basics",
            "display_name": "Meditation Basics",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 38
        },
        {
            "id": "4b09fff90e954436b189f1e593c5db51",
            "name": "Mindfulness",
            "display_name": "Mindfulness",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 39
        },
        {
            "id": "1fe59d5407c243f987d9050862213835",
            "name": "Relax & Sleep",
            "display_name": "Relax & Sleep",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 40
        },
        {
            "id": "d690ffee9e6743a2b3ef5ffc1b490d54",
            "name": "Meditation Anywhere",
            "display_name": "Meditation Anywhere",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 41
        },
        {
            "id": "f4cf26e6059943a0a8e3a6533bb76239",
            "name": "Emotions",
            "display_name": "Emotions",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 42
        },
        {
            "id": "ee52cd1988ca496ab7b130de8ab3d9b2",
            "name": "Zen in Ten",
            "display_name": "Zen in Ten",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 43
        },
        {
            "id": "9f9be657134e4d868d76ae4988da01f1",
            "name": "Beginner",
            "display_name": "Beginner",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 44
        },
        {
            "id": "59a49f882ea9475faa3110d50a8fb3f3",
            "name": "Low Impact",
            "display_name": "Low Impact",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 45
        },
        {
            "id": "665395ff3abf4081bf315686227d1a51",
            "name": "Power Zone",
            "display_name": "Power Zone",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 46
        },
        {
            "id": "bf6639f2e50a4f0395cb1479542ed4bd",
            "name": "Climb",
            "display_name": "Climb",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 47
        },
        {
            "id": "a2ee6b0a98e2431baf60e5261b8605e2",
            "name": "Live DJ",
            "display_name": "Live DJ",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 48
        },
        {
            "id": "7579b9edbdf9464fa19eb58193897a73",
            "name": "Intervals",
            "display_name": "Intervals",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 49
        },
        {
            "id": "8c34b36dba084e22b91426621759230d",
            "name": "Heart Rate Zone",
            "display_name": "Heart Rate Zone",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 50
        },
        {
            "id": "f10471dcd6a34e5f8ed54eb634b5df19",
            "name": "Theme",
            "display_name": "Theme",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 51
        },
        {
            "id": "9745b8e2cb274a28b096387073a5d993",
            "name": "Groove",
            "display_name": "Groove",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 52
        },
        {
            "id": "1b31748d30fa4e38b2782698bb831320",
            "name": "Metrics",
            "display_name": "Metrics",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 53
        },
        {
            "id": "4228e9e57bf64c518d58a1d0181760c4",
            "name": "Pro Cyclist",
            "display_name": "Pro Cyclist",
            "fitness_discipline": "cycling",
            "is_active": true,
            "list_order": 54
        },
        {
            "id": "07e0a4ce14b745e9a7be6948cece8334",
            "name": "HIIT (BTR Cardio)",
            "display_name": "HIIT",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 55
        },
        {
            "id": "885fa45fc91240cca5ca96d8d0d25bff",
            "name": "Full Body (BTR Cardio)",
            "display_name": "Full Body",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 56
        },
        {
            "id": "c17def9c7b004f238a3369476b0866af",
            "name": "Low Intensity Floor",
            "display_name": "Low Intensity",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 57
        },
        {
            "id": "7761a495d2cb4775b8bb784851d10861",
            "name": "Shadowboxing (BTR Cardio)",
            "display_name": "Shadowboxing ",
            "fitness_discipline": "cardio",
            "is_active": true,
            "list_order": 58
        },
        {
            "id": "d549728def544a848b2492a3afbd6971",
            "name": "Total Body Yoga",
            "display_name": "Total Body",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 59
        },
        {
            "id": "6b0547c130c54f88b1c85b421d53bffa",
            "name": "Yoga Basics",
            "display_name": "Yoga Basics",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 60
        },
        {
            "id": "56c834e143d4423799fc1d3f3fd70ec8",
            "name": "Yoga Flow",
            "display_name": "Yoga Flow",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 61
        },
        {
            "id": "28172f66e4824a8fbd8b756e6c265ff4",
            "name": "Power Yoga",
            "display_name": "Power Yoga",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 62
        },
        {
            "id": "9da7b05642d44ec19050fa8bc547ecc9",
            "name": "Yoga Anywhere",
            "display_name": "Yoga Anywhere",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 63
        },
        {
            "id": "8fe8155b47a64da0a50a0c314fcd393c",
            "name": "Restorative Yoga",
            "display_name": "Restorative Yoga",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 64
        },
        {
            "id": "190494e7f04f49bc8d10412b081699e3",
            "name": "Pre & Postnatal Yoga",
            "display_name": "Pre & Postnatal Yoga",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 65
        },
        {
            "id": "2476cca19b304584942b4897a33ce838",
            "name": "Bootcamp Basics",
            "display_name": "Bootcamp Basics",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 66
        },
        {
            "id": "2a33cde6c4e9440b8321b05f700e0736",
            "name": "Bike Bootcamp",
            "display_name": "Bike Bootcamp",
            "fitness_discipline": "cycling",
            "is_active": false,
            "list_order": 67
        },
        {
            "id": "cd4f646b69ab40d0837f9420a7780149",
            "name": "Beginner Circuit",
            "display_name": "Beginner",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 68
        },
        {
            "id": "6543717c3ab74feb8711f224281cdf99",
            "name": "Cardio",
            "display_name": "Cardio",
            "fitness_discipline": "cardio",
            "is_active": false,
            "list_order": 69
        },
        {
            "id": "399c3aab3d6e45e48488703a8f7b5904",
            "name": "Low Intensity Circuit",
            "display_name": "Low Intensity",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 70
        },
        {
            "id": "e47d184cc3e047d6a318a52e0f25a36d",
            "name": "OUTDOOR Run + Strength",
            "display_name": "Run + Strength",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 71
        },
        {
            "id": "0b45ef267561426fbcebedae7a7432b1",
            "name": "OUTDOOR Run + Bodyweight",
            "display_name": "Run + Bodyweight",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 72
        },
        {
            "id": "a4606e24e17142b794ccfeafe1c56e9c",
            "name": "Run + Strength",
            "display_name": "Run + Strength",
            "fitness_discipline": "circuit",
            "is_active": false,
            "list_order": 73
        },
        {
            "id": "1a87ed4c06a74566ba7a1e4e3d68378b",
            "name": "Just Ride",
            "display_name": "Just Ride",
            "fitness_discipline": "cycling",
            "is_active": false,
            "list_order": 74
        },
        {
            "id": "3e8b662199414382be3f4bed70634f6f",
            "name": "Scenic (Cycling)",
            "display_name": "Scenic",
            "fitness_discipline": "cycling",
            "is_active": false,
            "list_order": 75
        },
        {
            "id": "9ea1256cf69b4bbe9c7b839ac704bde1",
            "name": "Guided Visualization",
            "display_name": "Guided Visualization",
            "fitness_discipline": "meditation",
            "is_active": true,
            "list_order": 76
        },
        {
            "id": "f7e3235ac4894dcb8694d2559ea43674",
            "name": "Beginner Running",
            "display_name": "Beginner",
            "fitness_discipline": "running",
            "is_active": true,
            "list_order": 77
        },
        {
            "id": "a4a28ea4bb2340bc9620a1fa3e0406d2",
            "name": "Climb Running",
            "display_name": "Climb",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 78
        },
        {
            "id": "262ab03b69ef40eebae697463c4971eb",
            "name": "Distance Running",
            "display_name": "Distance",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 79
        },
        {
            "id": "be93f3591e444631bd0e42b6d7e7fadc",
            "name": "Hill Running",
            "display_name": "Hills",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 80
        },
        {
            "id": "a8b4a232401f44d893554787d25d8e1f",
            "name": "Just Run",
            "display_name": "Just Run",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 81
        },
        {
            "id": "9474b7e53df2461b92eca7b772ed9f0e",
            "name": "Metrics Running",
            "display_name": "Metrics",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 82
        },
        {
            "id": "e40e2354fecf44258666a85973871525",
            "name": "not a class type",
            "display_name": "not a class type",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 83
        },
        {
            "id": "248e8f11ec8b490fb1b7ee540970e861",
            "name": "Pre & Post Run",
            "display_name": "Pre & Post Run",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 84
        },
        {
            "id": "f2c29be3cfc14d519c0bb9121ff69105",
            "name": "Race Prep Running",
            "display_name": "Race Prep",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 85
        },
        {
            "id": "961ee031e4774014801aea209936356f",
            "name": "Running Basics",
            "display_name": "Running Basics",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 86
        },
        {
            "id": "5fbe0d8811c543729700fe50019b5190",
            "name": "Scenic (Running)",
            "display_name": "Scenic",
            "fitness_discipline": "running",
            "is_active": false,
            "list_order": 87
        },
        {
            "id": "f45e6dd7d4ab46be86a23b3f6de0eef0",
            "name": "Arms & Shoulders (strength & toning) BTR",
            "display_name": "Arms & Shoulders (strength & toning) BTR",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 88
        },
        {
            "id": "237bbfbb27aa4f5c99cfa9e04299e8ab",
            "name": "Beginner (strength & toning)",
            "display_name": "Beginner",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 89
        },
        {
            "id": "d263bc82874e44b9b7b1c450e5c03162",
            "name": "Chest & Back (Strength & Toning)",
            "display_name": "Chest & Back",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 90
        },
        {
            "id": "4eb81961bb0843798ed254770797f679",
            "name": "Strength",
            "display_name": "Strength",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 91
        },
        {
            "id": "768147e821d249038c00ae3035b2b35f",
            "name": "Toning (Strength & Toning)",
            "display_name": "Toning",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 92
        },
        {
            "id": "a46f4789f9cd431b807fe19dcd8fe7de",
            "name": "Toning",
            "display_name": "Toning",
            "fitness_discipline": "strength",
            "is_active": false,
            "list_order": 93
        },
        {
            "id": "11bfd07a36aa48b49a94f928287e03c0",
            "name": "Chest & Back Stretch",
            "display_name": "Chest & Back Stretch",
            "fitness_discipline": "stretching",
            "is_active": false,
            "list_order": 94
        },
        {
            "id": "47dd4476990246dd9da127f30f8f9eae",
            "name": "Post-Ride Stretch",
            "display_name": "Post-Ride Stretch",
            "fitness_discipline": "stretching",
            "is_active": false,
            "list_order": 95
        },
        {
            "id": "8fc1cbb71ba34b9485ab5d90c7bfc52b",
            "name": "Specialized Stretch",
            "display_name": "Specialized",
            "fitness_discipline": "stretching",
            "is_active": false,
            "list_order": 96
        },
        {
            "id": "e20b05ad5eb54ab09b4a13d23e73fef0",
            "name": "Stretch",
            "display_name": "Stretch",
            "fitness_discipline": "stretching",
            "is_active": false,
            "list_order": 97
        },
        {
            "id": "2be6b4aa5a894761829d077fcdc4e0c3",
            "name": "Distance Walking",
            "display_name": "Distance",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 98
        },
        {
            "id": "0d7c84da75364e399fe3cb9c264c88a7",
            "name": "Low Intensity Running/Walking",
            "display_name": "Low Intensity",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 99
        },
        {
            "id": "d501bf75043547218531aff9277c49e3",
            "name": "OUTDOOR Power Walking",
            "display_name": "Power Walk",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 100
        },
        {
            "id": "6d010722eae2493eb93408ba559e7088",
            "name": "OUTDOOR Walk + Run",
            "display_name": "Walk + Run",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 101
        },
        {
            "id": "9a87e85d85c947c0bdb1388cd4d0a605",
            "name": "OUTDOOR Walk + Strength",
            "display_name": "Walk + Strength",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 102
        },
        {
            "id": "045a943d716040d685b8e812791be267",
            "name": "Walk + Strength",
            "display_name": "Walk + Strength",
            "fitness_discipline": "walking",
            "is_active": false,
            "list_order": 103
        },
        {
            "id": "1675982798a84c239c552b4cac158e41",
            "name": "Beginner Yoga",
            "display_name": "Beginner",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 104
        },
        {
            "id": "991b662d3d384f1ebc403faef7088262",
            "name": "Evening Yoga",
            "display_name": "Evening",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 105
        },
        {
            "id": "5cc79a3d63e64d1f96dac2f3e7ec728b",
            "name": "Morning Yoga",
            "display_name": "Morning",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 106
        },
        {
            "id": "60567f9a9f8f401bb4e4983ebd78af4d",
            "name": "test",
            "display_name": "test",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 107
        },
        {
            "id": "a5dc4597678247ac8053287ad81fa14c",
            "name": "Yoga",
            "display_name": "Yoga",
            "fitness_discipline": "yoga",
            "is_active": false,
            "list_order": 108
        },
        {
            "id": "e811d1b8b957496eb6bdd0f019855eab",
            "name": "Yoga on the Go",
            "display_name": "Yoga on the Go",
            "fitness_discipline": "yoga",
            "is_active": true,
            "list_order": 109
        }
    ],
    "browse_categories": [
        {
            "id": "072fb234a6c14b29a0e7ec3c2d0f090d",
            "name": "Walking",
            "slug": "walking",
            "list_order": 8,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/5efb062675eb4ce5b986afdca40aae90",
            "portal_image_url": "https://s3.amazonaws.com/browse-categories-images-prod/c303c8d09955417f928f6a75a4ae4334"
        },
        {
            "id": "2e56ee670dd34cc9bbc95d3704ca90ad",
            "name": "Running",
            "slug": "running",
            "list_order": 0,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/cb92005fe5e14531a359c3d31de9e5d0",
            "portal_image_url": "https://s3.amazonaws.com/browse-categories-images-prod/2dd45c9c847844ea8b64a84bd98a023f"
        },
        {
            "id": "70ced881326143949b1313534ec15871",
            "name": "Stretching",
            "slug": "stretching",
            "list_order": 6,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/4ae6c07cfcac4480977937efc10bb077",
            "portal_image_url": "https://s3.amazonaws.com/browse-categories-images-prod/df5d4386708145c7b04781c9d1fe5a8f"
        },
        {
            "id": "8a0ea0583ecf40a09c0e19d1c798c53e",
            "name": "Bootcamp",
            "slug": "bootcamp",
            "list_order": 7,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/d4b5eea91e9149d3890c5eee69cad1db",
            "portal_image_url": "https://s3.amazonaws.com/browse-categories-images-prod/e9b054091434478285000ec15dd2d2a0"
        },
        {
            "id": "945f74385ce14e19bb554c6664a24a73",
            "name": "Meditation",
            "slug": "meditation",
            "list_order": 5,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/c63f80f6f68747ba9a23c0c878a06479",
            "portal_image_url": "https://browse-categories-images-prod.s3.amazonaws.com/4a18caebf19341faaa29d4e23ac4c09c"
        },
        {
            "id": "946ed9ed0489457a8da22f6a03ed66d1",
            "name": "Cardio",
            "slug": "cardio",
            "list_order": 9,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/0dbf7b79a390490582dcd55e3fd8b84d",
            "portal_image_url": "https://s3.amazonaws.com/browse-categories-images-prod/78e98de9e04a436ea7df2e4ea6a522ce"
        },
        {
            "id": "94b0c6ff26c844cc8adbfdb07b9b3814",
            "name": "Outdoor",
            "slug": "outdoor",
            "list_order": 1,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/1cce43c6c18b466e95f84e347168b516",
            "portal_image_url": "https://browse-categories-images-prod.s3.amazonaws.com/93f6e9e1578847369dfcc470bbbc81fc"
        },
        {
            "id": "bf8702474a5a4ec9b36b143a6a9dd3a1",
            "name": "Yoga",
            "slug": "yoga",
            "list_order": 4,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/5940348ba4424679a8a35b55a7e8e632",
            "portal_image_url": "https://browse-categories-images-prod.s3.amazonaws.com/c351a67a13174a549d7aea150891ca64"
        },
        {
            "id": "dfcaa3e323ee464b9498e8818daa0784",
            "name": "Cycling",
            "slug": "cycling",
            "list_order": 2,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/43fdad96c58842d0bc3f61c4dec7a265",
            "portal_image_url": "https://s3.amazonaws.com/browse-categories-images-prod/7e47ee503e434628acb94be43e49d208"
        },
        {
            "id": "f24e8ddbc6314da29c1980c65e8989e7",
            "name": "Strength",
            "slug": "strength",
            "list_order": 3,
            "icon_url": "https://browse-categories-images-prod.s3.amazonaws.com/623d5f9481814201b3f250da8cd22c70",
            "portal_image_url": "https://s3.amazonaws.com/browse-categories-images-prod/6ac43507671a4a659a10f0036f75ebcf"
        }
    ],
    "fitness_disciplines": [
        {
            "id": "circuit",
            "name": "Bootcamp"
        },
        {
            "id": "walking",
            "name": "Walking"
        },
        {
            "id": "strength",
            "name": "Strength"
        },
        {
            "id": "cycling",
            "name": "Cycling"
        },
        {
            "id": "beyond_the_ride",
            "name": "Floor"
        },
        {
            "id": "meditation",
            "name": "Meditation"
        },
        {
            "id": "yoga",
            "name": "Yoga"
        },
        {
            "id": "stretching",
            "name": "Stretching"
        },
        {
            "id": "running",
            "name": "Running"
        },
        {
            "id": "cardio",
            "name": "Cardio"
        }
    ],
    "hide_explicit_rides": false
}`