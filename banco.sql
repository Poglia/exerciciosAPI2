create table exercicios (
	codigo serial primary key, 
	nome varchar(40) not null, 
	series varchar(10) not null, 
	repeticoes varchar(10) not null 	
);

-- inserir alguns registros
insert into exercicios (nome, series, repeticoes) values ('Supino' , '3', '15') , 
('Leg Press', '3', '20'), ('Agachamento', '4', '10');
