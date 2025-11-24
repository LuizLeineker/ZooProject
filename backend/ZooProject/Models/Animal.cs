using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Animal
{
    public int AnimalId { get; set; }

    [Required, MinLength(4), MaxLength(30)]
    public string Name { get; set; } = null!;

    [MaxLength(400)]
    public string? Description { get; set; }

    public DateTime Birth { get; set; }

    [Required, MaxLength(50)]
    public string Species { get; set; } = null!;

    [Required, MaxLength(30)]
    public string Habitat { get; set; } = null!;

    [Required, MaxLength(30)]
    public string CountryOrigin  { get; set; } = null!;
}
