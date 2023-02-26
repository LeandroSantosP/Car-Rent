# Cadrastro de Carro

**RF** => Requisitos Funcionais
Deve Ser Possivel Cadastra um novo carro

**RN** Regra de negocio
Nao Deve Ser Possivel Cadrastar um carro Com um Placa ja existem
Nao Dever Ser Nao deve ser possveil alterar a placa de um carro da cadrastrado
O Carro deve ser cadrastrado, por padrao, com disponibilizada
U Usuario Responsavel pelo cadrastro deve ser Usuario administrador

# Listagem de Carros

Deve Ser Possove listar todos os Carros disponivel
O client nao precisa estar logado
Deve Ser Possove listar todos os Carros pelo nome da categoria
Deve Ser Possove listar todos os Carros pelo nome da marca
Deve Ser Possove listar todos os Carros peolo nome do carro

# Categorias

**RF** => Requisitos Funcionais
Deve ser possivel criar uma nova Categoria

**RN** Regra de negocio
Somente Admin podem ser possivel de criar Categorias

# Specification

**RF** => Requisitos Funcionais
Deve ser possivel cadastar uma especificacao para um carro
deve ser possivel listar todas as especificacoes
deve ser possivel listar todos os carros de

**RN** Regra de negocio
Nao deve ser possivel cadrastrar uma especificao para um carro nao catrastrado.
nao deve ser possivel uma especificao ja existente para o mesmo carro.
O Usuario responsavel pelo cadrastro de especificao deve ser amdin

# Cars

**RF** => Requisitos Funcionais

**RN** Regra de negocio

# Cadastrar Client

**RF** => Requisitos Funcionais
Deve ser possivel cadrastar um novo usuario
Deve Ser posivel listar os client ADM[X]
Deve ser possivel pegar dados de um client expesifico!

**RN** Regra de negocio
Nao deve ser possivel criar um usuario onde o email ja esta cadastra-do.
O Clinet Deve ter Obrigatoriamente uma licenca para dirigir valida.
Nao deve ser possivel criar um client que tenha a licenca de dirigir ja cadastra-da.
Somente Usuarios admins podem listar todos os Usuarios,

## Rental

**RF**
deve ser possivel cadrastral um alugel

**RN**
O Aluguel deve ter duracao minima de 24 horas.
Nao deve ser possivel cadastrar um aluguel caso ja exista um aberto para o mesmo client.
Nao deve ser possvel cadastar um novo aluguel caso ja exista um aberto para o mesmo carro,
O client deve esta logado na aplicacao
Ao efetuar um aluguel o carro em questao deve ficar indisponivel ate o fim do aluguel.

## Devolucao de um carro

**RF**
Deve ser possivel realizar de devolucao de um carro.

**RN**
Se o carro for devolvido com menos de 24 horas, devera ser cobrado a diaria completa.
Ao realizar a devolucao, o carro deve ser liberado para outro alguel.
Ao realizar a devolucao, o clinet deve ser liberado para alugar outro carro.
Caso o horario de devolucao seja superior ao horario provisto de entrega, deverar ser cobrado multa por propocionalmente aos dias de atraso.
Caso haja multa, devera ser somado ao total do aluguel.
O client deve esta logado na aplicacao
