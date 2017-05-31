namespace ClassLibrary1
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RecipeIngredient")]
    public partial class RecipeIngredient
    {
        public int Id { get; set; }

        public int RecipeId { get; set; }

        public int IngredientId { get; set; }

        public virtual Ingredient Ingredient { get; set; }

        public virtual Recipe Recipe { get; set; }
    }
}
