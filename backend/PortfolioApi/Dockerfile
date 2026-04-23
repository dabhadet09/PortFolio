# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["PortfolioApi.csproj", "./"]
RUN dotnet restore "./PortfolioApi.csproj"

# Copy the rest of the code and build
COPY . .
RUN dotnet publish "PortfolioApi.csproj" -c Release -o /app/publish

# Use the official runtime image for the final container
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# ---> ADD THIS EXACT LINE HERE <---
COPY --from=build /src/Data ./Data

# Render exposes the web service on a dynamic port
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "PortfolioApi.dll"]
