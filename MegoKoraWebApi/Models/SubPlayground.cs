namespace MegoKoraWebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SubPlayground")]
    public partial class SubPlayground
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SubPlayground()
        {
            Reservation = new HashSet<Reservation>();
            Reviews = new HashSet<Reviews>();
        }

        public int SubPlaygroundID { get; set; }

        [Column(TypeName = "money")]
        public decimal Price { get; set; }

        [Required]
        [StringLength(5)]
        public string Type { get; set; }

        public double? Rate { get; set; }

        [Column(TypeName = "image")]
        public byte[] Image { get; set; }

        public int PlaygroundID { get; set; }

        public virtual Playground Playground { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Reservation> Reservation { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Reviews> Reviews { get; set; }
    }
}
