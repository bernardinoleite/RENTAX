**RF** => `Requisitos Funcionais`
--
São a funcionalidades que a nossa aplicação vai ter, exemplo: deve ser possivel cadastrar um usuario, O usuario deve conseguir recuperar a senha com o email

**RNF** => `Requisitos Não Funcionais`
-- 

São requisitos que não estão ligados directamente com a regra de negócio, é mais uma questão de escolha, otimização e escolha das tecnologias, exemplo: Os dados devem ser salvos no banco de dados postgres

**RN** => `Regras de Negócios`
--
São as  regras por tras dos nossos RF, definindo os limites, como deve ser feito e como não deve ser feito cada RF, exemplo: Não deve ser possivel cadastrar um usuario com email ja existente, não deve ser possivel cadastrar um usuario com idade inferior a 18


Fim.
----------------------------------------------
  
# Cadastro de Carros

**RF** => `Requisitos Funcionais`

* Deve ser possivel cadastrar um carro novo

**RNF** => `Requisitos Não Funcionais`

**RN** => `Regras de Negócios`

* Não deve ser possivel cadastrar um carro com uma placa ja existente
* O carro deve ser cadastrado com disponibilidade true por padrão
* O usuario responsavel pelo cadastro de carro deve ser um administrador

# Listagem de Carros

***RF***

* Deve ser possivel listar todos os carros disponiveis (available===true)
* Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
* Deve ser possivel listar todos os carros disponiveis pelo nome da marca
* Deve ser possivel listar todos os carros disponiveis pelo nome do carro



***RNF***

***RN***

* O usuario não precisa estar logado para fazer a listagem de carros


# Cadastro de especificação no Carro

***RF***

* deve ser possivel cadastrar uma especificação para um carro
* deve ser possivel listar todas as especificação 
* deve ser possivel listar todos os Carros

***RNF***

***RN***

* Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
* Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro
* O usuario responsavel pelo cadastro de especificações deve ser um administrador



# Cadastro de imagens do Carro

***RF***

* deve ser possivel cadastrar a imagem para o carro
* deve ser possivel listar todos os carros


***RNF***

* Utilizar o multer para upload de arquivos
***RN***

* O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
* O usuario responsavel pelo cadastro de imagens deve ser um administrador



# Aluguel de Carro

***RF***

* deve ser possivel cadastrar um aluguel 


***RNF***

***RN***

* o aluguel deve ter duração minima de 24 horas
* Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
* Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro
