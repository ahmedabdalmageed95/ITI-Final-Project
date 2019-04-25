namespace MegoKoraWebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Playground")]
    public partial class Playground
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Playground()
        {
            SubPlayground = new HashSet<SubPlayground>();
        }

        public int PlaygroundID { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Country { get; set; }

        [Required]
        [StringLength(50)]
        public string City { get; set; }

        [Required]
        [StringLength(255)]
        public string Street { get; set; }

		[Required]
		[StringLength(11)]
		public string Phone1 { get; set; }

		[StringLength(11)]
		public string Phone2 { get; set; }

        public double? Rate { get; set; }

        [Column(TypeName = "image")]
        public byte[] Image { get; set; }

        public int OwnerID { get; set; }

        public virtual Owner Owner { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SubPlayground> SubPlayground { get; set; }
    }
}
