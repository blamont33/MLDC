create table ingredients (
	id_ingredient SERIAL primary key,
	name VARCHAR(100)
);

create table recipes (
	id_recipe SERIAL primary key,
	name VARCHAR(255),
	link VARCHAR(255),
	nb_persons int,
	making text,
	cal int
);

create type measure as enum ('','g','cl','ml','pincée','poignée', 'c.s.', 'c.c.');

create table recipes_ingredients (
	id_ingredient int,
	id_recipe int,
	quantity numeric,
	measure measure,
	constraint PK_recipes_ingredients primary key (id_ingredient, id_recipe),
	constraint FK_recipes_ingredients_ingredients foreign key (id_ingredient) references ingredients(id_ingredient),
	constraint FK_recipes_ingredients_recipes foreign key (id_recipe) references recipes(id_recipe)
);

create table menu (
	id_menu SERIAL primary key,
	created_at timestamp default now(),
	updated_at timestamp default now()
);

create table menu_recipes (
    id_menu int,
    id_recipe int,
    constraint FK_menu_recipe_menu foreign key (id_menu) references menu(id_menu),
	constraint FK_menu_recipe_recipe foreign key (id_recipe) references recipes(id_recipe)
);

		
insert into ingredients values (default,'abricot sec');
insert into ingredients values (default,'ail');
insert into ingredients values (default,'amandes effilées');
insert into ingredients values (default,'aneth');
insert into ingredients values (default,'aubergine');
insert into ingredients values (default,'avocat');
insert into ingredients values (default,'bacon');
insert into ingredients values (default,'bananes');
insert into ingredients values (default,'beurre');
insert into ingredients values (default,'beurre d''amande');
insert into ingredients values (default,'beurre de cacahuète');
insert into ingredients values (default,'blé');
insert into ingredients values (default,'bouillon de légumes');
insert into ingredients values (default,'feuille de brick');
insert into ingredients values (default,'brioche');
insert into ingredients values (default,'briquet');
insert into ingredients values (default,'brocoli');
insert into ingredients values (default,'butternut');
insert into ingredients values (default,'café');
insert into ingredients values (default,'camembert');
insert into ingredients values (default,'camomille');
insert into ingredients values (default,'canard wc');
insert into ingredients values (default,'canelle');
insert into ingredients values (default,'carotte');
insert into ingredients values (default,'céleri');
insert into ingredients values (default,'champignon');
insert into ingredients values (default,'chapelure');
insert into ingredients values (default,'charcuterie');
insert into ingredients values (default,'cheddar');
insert into ingredients values (default,'chèvre buche');
insert into ingredients values (default,'chèvre frais');
insert into ingredients values (default,'chewing-gum');
insert into ingredients values (default,'chocolat dessert');
insert into ingredients values (default,'chorizo');
insert into ingredients values (default,'chou fleur');
insert into ingredients values (default,'chou vert');
insert into ingredients values (default,'ciboulette');
insert into ingredients values (default,'cidre');
insert into ingredients values (default,'citron jaune');
insert into ingredients values (default,'citron vert');
insert into ingredients values (default,'clémentine');
insert into ingredients values (default,'concentré de tomate');
insert into ingredients values (default,'concombre');
insert into ingredients values (default,'coquillette');
insert into ingredients values (default,'coriandre');
insert into ingredients values (default,'coton tige');
insert into ingredients values (default,'courgette');
insert into ingredients values (default,'crème de coco');
insert into ingredients values (default,'crème entière');
insert into ingredients values (default,'crème fraiche');
insert into ingredients values (default,'crème de soja');
insert into ingredients values (default,'cumin');
insert into ingredients values (default,'curcuma');
insert into ingredients values (default,'curry');
insert into ingredients values (default,'déodorant');
insert into ingredients values (default,'échalotte');
insert into ingredients values (default,'fromage rapé');
insert into ingredients values (default,'épinards');
insert into ingredients values (default,'éponge');
insert into ingredients values (default,'farine');
insert into ingredients values (default,'farine complète');
insert into ingredients values (default,'farine de sarrasin');
insert into ingredients values (default,'maïzena');
insert into ingredients values (default,'feta');
insert into ingredients values (default,'feta salakis');
insert into ingredients values (default,'feuille de riz');
insert into ingredients values (default,'film alimentaire');
insert into ingredients values (default,'fish sauce');
insert into ingredients values (default,'flocons d''avoine');
insert into ingredients values (default,'fraises');
insert into ingredients values (default,'framboises');
insert into ingredients values (default,'frites');
insert into ingredients values (default,'fromage');
insert into ingredients values (default,'fromage blanc');
insert into ingredients values (default,'fromage à burger');
insert into ingredients values (default,'fromage à raclette');
insert into ingredients values (default,'fruit');
insert into ingredients values (default,'gants');
insert into ingredients values (default,'gingembre');
insert into ingredients values (default,'gnocchi');
insert into ingredients values (default,'graines de sésame');
insert into ingredients values (default,'haricots noirs');
insert into ingredients values (default,'haricots rouges');
insert into ingredients values (default,'haricots verts');
insert into ingredients values (default,'huile de sésame');
insert into ingredients values (default,'huile d''olive');
insert into ingredients values (default,'huile de friture');
insert into ingredients values (default,'huile de tournesol');
insert into ingredients values (default,'jambon fumé');
insert into ingredients values (default,'jambon');
insert into ingredients values (default,'javel');
insert into ingredients values (default,'kale');
insert into ingredients values (default,'ketchup');
insert into ingredients values (default,'kiwis');
insert into ingredients values (default,'knacki');
insert into ingredients values (default,'labello');
insert into ingredients values (default,'lait');
insert into ingredients values (default,'lait de coco');
insert into ingredients values (default,'lardon');
insert into ingredients values (default,'lasagnes');
insert into ingredients values (default,'laurier');
insert into ingredients values (default,'lemon grass');
insert into ingredients values (default,'lentilles');
insert into ingredients values (default,'lentilles corail');
insert into ingredients values (default,'lentilles beluga');
insert into ingredients values (default,'lessive');
insert into ingredients values (default,'levure boulangère');
insert into ingredients values (default,'liquide vaisselle');
insert into ingredients values (default,'mâche');
insert into ingredients values (default,'maïs');
insert into ingredients values (default,'marron');
insert into ingredients values (default,'menthe');
insert into ingredients values (default,'mouchoir');
insert into ingredients values (default,'moutarde');
insert into ingredients values (default,'mozzarella');
insert into ingredients values (default,'muffin anglais');
insert into ingredients values (default,'muscade');
insert into ingredients values (default,'naan');
insert into ingredients values (default,'navets');
insert into ingredients values (default,'nectarine');
insert into ingredients values (default,'noix de cajou');
insert into ingredients values (default,'oeufs');
insert into ingredients values (default,'oignon');
insert into ingredients values (default,'oignon rouge');
insert into ingredients values (default,'oignons nouveaux');
insert into ingredients values (default,'olives vertes');
insert into ingredients values (default,'pain');
insert into ingredients values (default,'pain burger');
insert into ingredients values (default,'papier cadeau');
insert into ingredients values (default,'papier toilette');
insert into ingredients values (default,'parmesan');
insert into ingredients values (default,'patate douce');
insert into ingredients values (default,'pâte de curry');
insert into ingredients values (default,'pâte feuilletée');
insert into ingredients values (default,'nouilles chinoises');
insert into ingredients values (default,'pâtes complètes');
insert into ingredients values (default,'penne');
insert into ingredients values (default,'persil');
insert into ingredients values (default,'piles balance');
insert into ingredients values (default,'piment');
insert into ingredients values (default,'poireaux');
insert into ingredients values (default,'pois cassés');
insert into ingredients values (default,'pois chiche');
insert into ingredients values (default,'poisson');
insert into ingredients values (default,'poivre');
insert into ingredients values (default,'poivron jaune');
insert into ingredients values (default,'poivron rouge');
insert into ingredients values (default,'poivron vert');
insert into ingredients values (default,'polenta');
insert into ingredients values (default,'pomme de terre');
insert into ingredients values (default,'pommes');
insert into ingredients values (default,'poulet');
insert into ingredients values (default,'pousses de soja');
insert into ingredients values (default,'produit four');
insert into ingredients values (default,'quinoa');
insert into ingredients values (default,'raisins');
insert into ingredients values (default,'ras el hanout');
insert into ingredients values (default,'riz arborio');
insert into ingredients values (default,'riz basmati');
insert into ingredients values (default,'roquette');
insert into ingredients values (default,'sac poubelle');
insert into ingredients values (default,'saint nectaire');
insert into ingredients values (default,'salade');
insert into ingredients values (default,'sardine');
insert into ingredients values (default,'sauce huitre');
insert into ingredients values (default,'sauce soja');
insert into ingredients values (default,'saucisse fumée');
insert into ingredients values (default,'saucisson');
insert into ingredients values (default,'saumon fumé');
insert into ingredients values (default,'savon');
insert into ingredients values (default,'sel');
insert into ingredients values (default,'semoule');
insert into ingredients values (default,'shampooing');
insert into ingredients values (default,'sirop d''agave');
insert into ingredients values (default,'sopalin');
insert into ingredients values (default,'sucre');
insert into ingredients values (default,'tabasco');
insert into ingredients values (default,'tahini');
insert into ingredients values (default,'tex mex');
insert into ingredients values (default,'thé');
insert into ingredients values (default,'thé noir');
insert into ingredients values (default,'tofu');
insert into ingredients values (default,'tomate');
insert into ingredients values (default,'tomate cerise');
insert into ingredients values (default,'tomates séchées');
insert into ingredients values (default,'vanille');
insert into ingredients values (default,'veau');
insert into ingredients values (default,'vermicelle de riz');
insert into ingredients values (default,'verveine');
insert into ingredients values (default,'vin blanc');
insert into ingredients values (default,'vinaigre balsamique');
insert into ingredients values (default,'wrap');
insert into ingredients values (default,'yaourt nature');
insert into ingredients values (default,'speck');
insert into ingredients values (default,'garam masala');
insert into ingredients values (default,'thon');
insert into ingredients values (default,'pain de mie');
insert into ingredients values (default,'thym');
insert into ingredients values (default,'basilic');
insert into ingredients values (default,'miel');
insert into ingredients values (default,'eau');
insert into ingredients values (default,'ricotta');
insert into ingredients values (default,'bicarbonate');
insert into ingredients values (default,'coriandre en poudre');
insert into ingredients values (default,'paprika');
insert into ingredients values (default,'endive');
insert into ingredients values (default,'tranche de jambon');
insert into ingredients values (default,'crème liquide');
insert into ingredients values (default,'livarot');
insert into ingredients values (default,'noix de muscade');
insert into ingredients values (default,'vinaigre de vin blanc');
insert into ingredients values (default,'sirop d''érable');
insert into ingredients values (default,'bacon rond');
insert into ingredients values (default,'courge');
insert into ingredients values (default,'yaourt grecque');
insert into ingredients values (default,'levure chimique');
insert into ingredients values (default,'tagliatelles');
insert into ingredients values (default,'sucre vanillé');
insert into ingredients values (default,'comté rapé');
insert into ingredients values (default,'lait entier');
insert into ingredients values (default,'sucre equitable');
insert into ingredients values (default,'rhum');
insert into ingredients values (default,'flocons de pomme de terre');
insert into ingredients values (default,'herbes de provence');
insert into ingredients values (default,'graine de cumin');
insert into ingredients values (default,'origan');
insert into ingredients values (default,'epices tex-mex');
insert into ingredients values (default,'bouillon de volaille');
insert into ingredients values (default,'sauge');
insert into ingredients values (default,'feuille de sauge');
insert into ingredients values (default,'romarin');
insert into ingredients values (default,'cuisse de lapin');
insert into ingredients values (default,'fond de veau');
insert into ingredients values (default,'haricot blanc');
insert into ingredients values (default,'pignon de pin');
insert into ingredients values (default,'orecchiette');
insert into ingredients values (default,'gorgonzola');
insert into ingredients values (default,'noix');
insert into ingredients values (default,'mascarpone');
insert into ingredients values (default,'moules');
insert into ingredients values (default,'roquefort');
insert into ingredients values (default,'vermicelle');
insert into ingredients values (default,'petit pois');
insert into ingredients values (default,'chutney mangue');
insert into ingredients values (default,'coulis de tomate');
insert into ingredients values (default,'van houten');
insert into ingredients values (default,'vinaigre de riz');
insert into ingredients values (default,'oignon vert');
insert into ingredients values (default,'crevettes');
insert into ingredients values (default,'boursin');
insert into ingredients values (default,'bagel');
insert into ingredients values (default,'philadelphia');
insert into ingredients values (default,'noix de pecan');
insert into ingredients values (default,'pépite de chocolat');
insert into ingredients values (default,'huile isio 4');
insert into ingredients values (default,'4 épices');
insert into ingredients values (default,'steack');
insert into ingredients values (default,'cornichon');
insert into ingredients values (default,'saumon');
insert into ingredients values (default,'artichaut');
insert into ingredients values (default,'olives noires');
insert into ingredients values (default,'paupiettes');
insert into ingredients values (default,'amande en poudre');
insert into ingredients values (default,'yaourt au soja');
insert into ingredients values (default,'cardamone');
insert into ingredients values (default,'doritos');
insert into ingredients values (default,'sauce bbq');
insert into ingredients values (default,'tomate séchée');
insert into ingredients values (default,'jus de citron');
insert into ingredients values (default,'feta allégée');
insert into ingredients values (default,'farine de pois chiche');
insert into ingredients values (default,'asperge');
insert into ingredients values (default,'chocolat');
insert into ingredients values (default,'oignon nouveau');
insert into ingredients values (default,'vache qui rit');
insert into ingredients values (default,'sauce worcestershire');
insert into ingredients values (default,'boeuf');
insert into ingredients values (default,'jaune d''oeuf');
insert into ingredients values (default,'capre');
insert into ingredients values (default,'za''atar');
insert into ingredients values (default,'pois du cap');
insert into ingredients values (default,'betterave');
insert into ingredients values (default,'vinaigre de cidre');
insert into ingredients values (default,'poudre d''ail');
insert into ingredients values (default,'shiitake');
insert into ingredients values (default,'cajun');
insert into ingredients values (default,'pleurotes');
insert into ingredients values (default,'pita');
insert into ingredients values (default,'conchiglies');
insert into ingredients values (default,'Champignon portobello');
insert into ingredients values (default,'tortillas');
insert into ingredients values (default,'bruschetta');
insert into ingredients values (default,'jambon de parme');
insert into ingredients values (default,'chair à saucisse');
insert into ingredients values (default,'saint agur');
insert into ingredients values (default,'sauce teriyaki');
insert into ingredients values (default,'burratina');
insert into ingredients values (default,'pistache');
insert into ingredients values (default,'graine de courge');
insert into ingredients values (default,'estragon');
insert into ingredients values (default,'cassonade');
insert into ingredients values (default,'mozzarella rapée');
insert into ingredients values (default,'sucre glace');
insert into ingredients values (default,'gousse de vanille');
insert into ingredients values (default,'dentifrice');
insert into ingredients values (default,'coton');
insert into ingredients values (default,'bee wrap');
insert into ingredients values (default,'papier sulfurisé');
insert into ingredients values (default,'huile de noix');
insert into ingredients values (default,'ail en poudre');
insert into ingredients values (default,'olive noir');
insert into ingredients values (default,'citronnelle');
insert into ingredients values (default,'sucre roux');
insert into ingredients values (default,'chou blanc');
insert into ingredients values (default,'tomate concassées');
insert into ingredients values (default,'riz brun');
insert into ingredients values (default,'destop');
insert into ingredients values (default,'gel intime');
insert into ingredients values (default,'abricot');
insert into ingredients values (default,'brugnon');
insert into ingredients values (default,'pomme de terre grenaille');
insert into ingredients values (default,'nutella');
insert into ingredients values (default,'poudre de cari');
insert into ingredients values (default,'melon');
insert into ingredients values (default,'jambon cru');
insert into ingredients values (default,'raisin sec');
insert into ingredients values (default,'boulgour');
insert into ingredients values (default,'pois mange tout');
insert into ingredients values (default,'oignon frit');
insert into ingredients values (default,'seitan');
insert into ingredients values (default,'poudre de chili');
insert into ingredients values (default,'cacahuetes');
insert into ingredients values (default,'confit oignon');
insert into ingredients values (default,'foie gras');
insert into ingredients values (default,'porc');

INSERT INTO public.recipes ("name",link,nb_persons,making,cal) VALUES
	 ('laap','',4,NULL,432),
	 ('salade de lentilles','https://www.delscookingtwist.com/fr/salade-de-lentilles-vertes-betteraves-et-feta/',4,NULL,534),
	 ('polenta hiver','',4,NULL,528),
	 ('shiitakes et tofu mijotés à la sauce soja','https://www.un-peu-gay-dans-les-coings.eu/2015/06/shiitakes-et-tofu-mijotes-la-sauce-soja.html',4,NULL,527),
	 ('Oeufs brouillés aux épinards et à la feta','',4,NULL,575),
	 ('poulet purée brocoli','',4,NULL,525);

INSERT INTO public.recipes_ingredients (id_ingredient,id_recipe,quantity,measure) VALUES
	 (2,1,1,''),
	 (248,1,1,''),
	 (337,1,320,'g'),
	 (40,1,1,''),
	 (123,1,1,''),
	 (112,1,1,''),
	 (165,1,1,''),
	 (45,1,1,''),
	 (56,1,2,''),
	 (102,1,1,'');
INSERT INTO public.recipes_ingredients (id_ingredient,id_recipe,quantity,measure) VALUES
	 (144,1,600,'g'),
	 (68,1,1,''),
	 (6,2,1,''),
	 (283,2,1,'c.s.'),
	 (58,2,100,'g'),
	 (105,2,200,'g'),
	 (81,2,1,'c.s.'),
	 (122,2,4,''),
	 (56,2,1,''),
	 (282,2,2,'');
INSERT INTO public.recipes_ingredients (id_ingredient,id_recipe,quantity,measure) VALUES
	 (200,2,1,'c.c.'),
	 (64,2,100,'g'),
	 (86,2,3,'c.s.'),
	 (64,3,200,'g'),
	 (149,3,200,'g'),
	 (198,3,1,'c.c.'),
	 (199,3,1,''),
	 (122,3,8,''),
	 (86,3,1,'c.s.'),
	 (26,3,250,'g');
INSERT INTO public.recipes_ingredients (id_ingredient,id_recipe,quantity,measure) VALUES
	 (58,3,400,'g'),
	 (2,4,3,''),
	 (122,4,4,''),
	 (174,4,2,'c.s.'),
	 (182,4,500,'g'),
	 (285,4,250,'g'),
	 (337,4,280,'g'),
	 (166,4,100,'g'),
	 (64,5,100,'g'),
	 (58,5,200,'g');
INSERT INTO public.recipes_ingredients (id_ingredient,id_recipe,quantity,measure) VALUES
	 (136,5,200,'g'),
	 (24,5,4,''),
	 (122,5,12,''),
	 (152,6,600,'g'),
	 (17,6,600,'g'),
	 (150,6,1000,'g'),
	 (97,6,250,'g'),
	 (9,6,50,'g');	 