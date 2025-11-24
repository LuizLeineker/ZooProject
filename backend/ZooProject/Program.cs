using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// banco agora em sqlserver
builder.Services.AddDbContext<AppDataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
// controllers
builder.Services.AddControllers();

// ligacao -> react/vite
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // Porta VITE
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowReact"); 

app.MapGet("/", () => "Welcome to the Zoo API!");

// CRUD - ANIMALS ------------------------------------------------------------------------------------

// C - CREATE
app.MapPost("/animal/create", async (Animal animal, AppDataContext context) => {

    // se fosse necessário poderia implementar uma verificação para ver se existe ou não um animal com aquele nome.
    
    context.Animals.Add(animal);
    await context.SaveChangesAsync();

    return Results.Created($"/animals/{animal.AnimalId}", animal);
});

// R - READ
app.MapGet("/animals", async (AppDataContext context) => 
{
    return Results.Ok(await context.Animals.ToListAsync());
});

// para update e read no front
app.MapGet("/animal/{id}", async (int id, AppDataContext context) =>
{
    var animal = await context.Animals.FindAsync(id);
    if (animal is null)
        return Results.NotFound("Animal not found.");

    return Results.Ok(animal);
});

// U - UPDATE
app.MapPut("/animal/update/{id}", async (int id, Animal input, AppDataContext context) =>
{
    var animal = await context.Animals.FindAsync(id);
    if(animal is null)
        return Results.NotFound("Animal not found.");
    
    animal.Name = input.Name;
    animal.Description = input.Description ;
    animal.Birth = input.Birth;
    animal.Species = input.Species;
    animal.Habitat = input.Habitat;
    animal.CountryOrigin = input.CountryOrigin;

    await context.SaveChangesAsync();
    return Results.Ok(animal);
});

// D - DELETE
app.MapDelete("/animal/delete/{id}", async (int id, AppDataContext context) =>
{
    var animal = await context.Animals.FindAsync(id);
    if(animal is null) 
        return Results.NotFound("Animal not found.");

    context.Animals.Remove(animal);
    await context.SaveChangesAsync();

    return Results.NoContent();
});


// CRUD - CARE ------------------------------------------------------------------------------------

// C - CREATE
app.MapPost("/cuidado/create", async (Care care, AppDataContext context) => {

    
    context.Cares.Add(care);
    await context.SaveChangesAsync();

    return Results.Created($"/cuidados/{care.CareId}", care);
});

// R - READ
app.MapGet("/cuidados", async (AppDataContext context) => 
{
    return Results.Ok(await context.Cares.ToListAsync());
});

// U - UPDATE
app.MapPut("/cuidado/update/{id}", async (int id, Care input, AppDataContext context) =>
{
    var care = await context.Cares.FindAsync(id);
    if(care is null)
        return Results.NotFound("Care not found.");
    
    care.Name = input.Name;
    care.Description = input.Description;
    care.Frequency = input.Frequency;

    await context.SaveChangesAsync();
    return Results.Ok(care);
});

// D - DELETE
app.MapDelete("/cuidado/delete/{id}", async (int id, AppDataContext context) =>
{
    var care = await context.Cares.FindAsync(id);
    if(care is null) 
        return Results.NotFound("Care not found."); 

    context.Cares.Remove(care);
    await context.SaveChangesAsync();

    return Results.NoContent();
});

// para update e read no front
app.MapGet("/cuidado/{id}", async (int id, AppDataContext context) =>
{
    var cuidado = await context.Cares.FindAsync(id);
    if (cuidado is null)
        return Results.NotFound("Care not found.");

    return Results.Ok(cuidado);
});


app.Run();

