
# Dating APP

- Add appsettings.json file to API folder with below code snipets
```
{
  "AppSettings":{
    "Token":"abcd ABCD 1234 !@#$%^&*(){}"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=DataingApp.DB;Trusted_Connection=true;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",

  "CloudinarySettings":{
    "CloudName":"<Yours Key>",
    "ApiKey":"<Yours Key>",
    "ApiSecret":"<Yours Key>"
  }
}
```

Technology Used.
  - Dot net Core 2.2
  - Angular 10
  - Node 12
  - Sql Server 14

For PowerShell Migration.
  - Add-Migration initDB
  - Update-Database
  
For CLI Migration.
  - dotnet ef migrations add InitialCreate
  - dotnet ef database update

Some Commands.
  - dotnet ef database drop (drop database)
  - dotnet ef migrations list (Show all Migrations)
  - dotnet ef migrations  remove (Remove Latest Migration)
  

For API add below pkage from nuget.
  - Microsoft.IdentityModel.Tokens
  - System.IdentityModel.Tokens.Jwt
  - Microsoft.AspNetCore.Authentication.JwtBearer
  - AutoMapper.Extensions.Microsoft.DependencyInjection
  - CloudinaryDotNet 

For Angular.
  - npm install bootstrap and font awesome
  - npm install alertifyjs
  - npm install @auth0/angular-jwt
  - npm install ngx-bootstrap --save
  - npm install bootswatch
  - npm install @kolkov/ngx-gallery
  - npm install ng2-file-upload --save
  - npm install ngx-timeago --save

## References used 

[Reference link](https://www.udemy.com/share/101Wh2/)

###### Thanks To Neil Cummings

**✔️ Happy Coding 👍 😊**

