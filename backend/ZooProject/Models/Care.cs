using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Care
{
    public int CareId { get; set; }

    [Required, MinLength(4), MaxLength(30)]
    public string Name{ get; set; } = null!;

    [MaxLength(400)]
    public string? Description{ get; set; }

    [Required]
    public string Frequency { get; set; } = null!;
}
