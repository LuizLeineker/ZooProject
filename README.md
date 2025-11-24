# 🦁  Sistema Zoológico
O sistema permite cadastrar novos animais e cuidados para eles, registrar informações importantes como espécie,   
habitat, país de origem e data de nascimento, além de manter tudo organizado em um único lugar.


## 🛠️ Ferramentas 
Para visualização e execução do projeto instale em sua máquina a seguinte ferramenta: 
- [VSCode](https://code.visualstudio.com/download)
- [NodeJS](https://nodejs.org/en)
- [.NET](https://dotnet.microsoft.com/en-us/download)
- [SQL Management](https://learn.microsoft.com/en-us/ssms/install/install)
- [SQL Server](https://learn.microsoft.com/pt-br/sql/tools/configuration-manager/sql-server-configuration-manager?view=sql-server-ver17)

## 🖥️ Frontend
### Inicie o CMD/PowerShell na pasta `zoo-web`, localizada na pasta do frontend.

### Instale as dependências:
```bash
npm i
```
### Execute o projeto:
```bash
npm run dev
```

## ⚙️ Backend
Na pasta ZooProject, execute no terminal:
```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```
### Connection String
No arquivo `appsettings.json`, arrume a string de acordo com o banco.

### Banco de dados
Na pasta da api, crie as migrations:
```bash
dotnet ef migrations add InitialCreate
```
Banco de dados:
```bash
dotnet ef database update
```
### RUN
```bash
dotnet RUN
```

## 👀 Observações
- Depois de configurar e rodar o projeto, mantenha ambos os terminais (frontend e backend) abertos simultaneamente para que o sistema funcione corretamente.   
- O projeto, a princípio, não aborda relações entre tabelas, como a relação entre animal e cuidados.

## Dificuldades
- Enfrentei alguns desafios durante o desenvolvimento.       
- Fazia um tempo que eu não trabalhava com React, e a nova versão também contribuiu para um atraso na finalização do projeto.    
- Outro detalhe foi o banco SQL Server, com o qual eu não tinha experiência.    
