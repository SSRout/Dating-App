PowerShell:
	Add-Migration inintDB
    Update-Database
CLI:
	dotnet ef migrations add InitialCreate
	dotnet ef database update