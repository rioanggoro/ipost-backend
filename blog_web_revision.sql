PGDMP  /                    |            blog_web    16.3    16.3 #    2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            5           1262    26048    blog_web    DATABASE     j   CREATE DATABASE blog_web WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE blog_web;
                postgres    false            �            1259    26068 
   categories    TABLE     `   CREATE TABLE public.categories (
    id_category bigint NOT NULL,
    name character varying
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    26093    categories_id_category_seq    SEQUENCE     �   ALTER TABLE public.categories ALTER COLUMN id_category ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_category_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    26075    comment    TABLE     �   CREATE TABLE public.comment (
    id_comment bigint NOT NULL,
    post_id integer,
    user_id integer,
    content character varying
);
    DROP TABLE public.comment;
       public         heap    postgres    false            �            1259    26092    comment_id_coment_seq    SEQUENCE     �   ALTER TABLE public.comment ALTER COLUMN id_comment ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comment_id_coment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    26095    like    TABLE     f   CREATE TABLE public."like" (
    id_like bigint NOT NULL,
    post_id integer,
    user_id integer
);
    DROP TABLE public."like";
       public         heap    postgres    false            �            1259    26094    like_id_like_seq    SEQUENCE     �   ALTER TABLE public."like" ALTER COLUMN id_like ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.like_id_like_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    26056    post    TABLE     �   CREATE TABLE public.post (
    id_post bigint NOT NULL,
    user_id integer,
    title character varying,
    content character varying,
    category_id integer
);
    DROP TABLE public.post;
       public         heap    postgres    false            �            1259    26111    post_id_post_seq    SEQUENCE     �   ALTER TABLE public.post ALTER COLUMN id_post ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.post_id_post_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    26049    user    TABLE     �   CREATE TABLE public."user" (
    id_user bigint NOT NULL,
    username character varying,
    email character varying,
    password character varying
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    26110    user_id_user_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN id_user ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            (          0    26068 
   categories 
   TABLE DATA           7   COPY public.categories (id_category, name) FROM stdin;
    public          postgres    false    217   n&       )          0    26075    comment 
   TABLE DATA           H   COPY public.comment (id_comment, post_id, user_id, content) FROM stdin;
    public          postgres    false    218   �&       -          0    26095    like 
   TABLE DATA           ;   COPY public."like" (id_like, post_id, user_id) FROM stdin;
    public          postgres    false    222   �&       '          0    26056    post 
   TABLE DATA           M   COPY public.post (id_post, user_id, title, content, category_id) FROM stdin;
    public          postgres    false    216   �&       &          0    26049    user 
   TABLE DATA           D   COPY public."user" (id_user, username, email, password) FROM stdin;
    public          postgres    false    215   �&       6           0    0    categories_id_category_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categories_id_category_seq', 1, false);
          public          postgres    false    220            7           0    0    comment_id_coment_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.comment_id_coment_seq', 1, false);
          public          postgres    false    219            8           0    0    like_id_like_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.like_id_like_seq', 1, false);
          public          postgres    false    221            9           0    0    post_id_post_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.post_id_post_seq', 1, false);
          public          postgres    false    224            :           0    0    user_id_user_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_id_user_seq', 1, false);
          public          postgres    false    223            �           2606    26074    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id_category);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    217            �           2606    26081    comment comment_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id_comment);
 >   ALTER TABLE ONLY public.comment DROP CONSTRAINT comment_pkey;
       public            postgres    false    218            �           2606    26099    like like_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."like"
    ADD CONSTRAINT like_pkey PRIMARY KEY (id_like);
 :   ALTER TABLE ONLY public."like" DROP CONSTRAINT like_pkey;
       public            postgres    false    222            �           2606    26060    post post_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id_post);
 8   ALTER TABLE ONLY public.post DROP CONSTRAINT post_pkey;
       public            postgres    false    216            �           2606    26055    user user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    215            �           2606    26112    post category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.post
    ADD CONSTRAINT category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id_category) NOT VALID;
 ?   ALTER TABLE ONLY public.post DROP CONSTRAINT category_id_fkey;
       public          postgres    false    216    217    3468            �           2606    26082    comment post_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(id_post);
 >   ALTER TABLE ONLY public.comment DROP CONSTRAINT post_id_fkey;
       public          postgres    false    216    218    3466            �           2606    26100    like post_id_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public."like"
    ADD CONSTRAINT post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(id_post);
 =   ALTER TABLE ONLY public."like" DROP CONSTRAINT post_id_fkey;
       public          postgres    false    216    222    3466            �           2606    26063    post user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.post
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id_user) NOT VALID;
 ;   ALTER TABLE ONLY public.post DROP CONSTRAINT user_id_fkey;
       public          postgres    false    216    3464    215            �           2606    26087    comment user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id_user) NOT VALID;
 >   ALTER TABLE ONLY public.comment DROP CONSTRAINT user_id_fkey;
       public          postgres    false    215    218    3464            �           2606    26105    like user_id_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public."like"
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id_user);
 =   ALTER TABLE ONLY public."like" DROP CONSTRAINT user_id_fkey;
       public          postgres    false    222    215    3464            (      x������ � �      )      x������ � �      -      x������ � �      '      x������ � �      &      x������ � �     