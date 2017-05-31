namespace ClassLibrary1
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model1 : DbContext
    {
        public Model1()
            : base("name=CookbookEntity")
        {
        }

        public virtual DbSet<Ingredient> Ingredient { get; set; }
        public virtual DbSet<Recipe> Recipe { get; set; }
        public virtual DbSet<RecipeIngredient> RecipeIngredient { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ingredient>()
                .HasMany(e => e.RecipeIngredient)
                .WithRequired(e => e.Ingredient)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Recipe>()
                .HasMany(e => e.RecipeIngredient)
                .WithRequired(e => e.Recipe)
                .WillCascadeOnDelete(false);
        }
    }
}
