using System.Text.Json;
using System.Net;
using System.Net.Mail;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Configure CORS to allow the React app to access the API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.AllowAnyOrigin() // In production, replace with specific origins
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");

// Helper function to read JSON files
string ReadJsonFile(string fileName)
{
    var path = Path.Combine(Directory.GetCurrentDirectory(), "Data", fileName);
    if (!File.Exists(path)) return "[]";
    return File.ReadAllText(path);
}

// API Endpoints
app.MapGet("/api/profile", () =>
{
    var json = ReadJsonFile("profile.json");
    return Results.Text(json, "application/json");
}).WithName("GetProfile");

app.MapGet("/api/projects", () =>
{
    var json = ReadJsonFile("projects.json");
    return Results.Text(json, "application/json");
}).WithName("GetProjects");

app.MapGet("/api/skills", () =>
{
    var json = ReadJsonFile("skills.json");
    return Results.Text(json, "application/json");
}).WithName("GetSkills");

app.MapPost("/api/contact", async (ContactMessage message) =>
{
    var path = Path.Combine(Directory.GetCurrentDirectory(), "Data", "messages.json");
    List<ContactMessage> messages = new();
    
    if (File.Exists(path))
    {
        var existingJson = await File.ReadAllTextAsync(path);
        if (!string.IsNullOrWhiteSpace(existingJson)) 
        {
            messages = JsonSerializer.Deserialize<List<ContactMessage>>(existingJson) ?? new();
        }
    }
    
    messages.Add(message);
    var newJson = JsonSerializer.Serialize(messages, new JsonSerializerOptions { WriteIndented = true });
    await File.WriteAllTextAsync(path, newJson);
    
    // --- EMAIL SENDING LOGIC ---
    try 
    {
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential("dabhadet09@gmail.com", "YOUR_GMAIL_APP_PASSWORD"),
            EnableSsl = true,
        };
        
        var mailMessage = new MailMessage
        {
            From = new MailAddress("dabhadet09@gmail.com"),
            Subject = $"New Portfolio Contact from {message.Name}",
            Body = $"You have received a new message from your portfolio website!\n\nName: {message.Name}\nEmail: {message.Email}\n\nMessage:\n{message.Message}",
            IsBodyHtml = false,
        };
        mailMessage.To.Add("dabhadet09@gmail.com");
        
        // UNCOMMENT THE LINE BELOW once you add your App Password above:
        // await smtpClient.SendMailAsync(mailMessage); 
    } 
    catch (Exception ex) 
    {
        Console.WriteLine($"Email sending failed: {ex.Message}");
    }
    
    return Results.Ok(new { success = true });
}).WithName("SubmitContact");

app.Run();

public record ContactMessage(string Name, string Email, string Message);
