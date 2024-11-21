//I am changing the image links from firebase to amazon, firebase has issues with these direct links. Please remember to add the amazon link(that will show up at the error) instead of firebase at the cofig for it to work out.

export const cartProducts =
    {
      data: [
        {
          id: "64a654593e91b8e73a351e9b",
          name: "Ipsum-Man: The Long Way Home #1",
          description: "Short description",
          price: 600,
          discount: .3,
          hit: true,
          releaseDate: "2024-01-27",
          brand: "Grim Horse",
          digital: false,
          categories: ["Печатная книга", "Комикс"],
          cover: "Мягкая обложка",
          amount: 1,
          images: [
            {
              image:
                  "../src/images/ipsum.png",
            },
          ],
          reviews: null,
        },
        {
          id: "64a4ebe300900d44bb50628psdfsd",
          name: "Ipsum-Man: The Long Way Home #1",
          description: "Short description",
          price: 2999,
          discount: .15,
          hit: null,
          releaseDate: "2024-02-25",
          brand: "Grim Horse",
          digital: false,
          categories: ["Печатная книга", "Комикс"],
          cover: "Мягкая обложка",
          amount: 1,
          images: [
            {
              image:
                  "../src/images/free comic cover 210-326.png",
            },
          ],
          reviews: null,
        },
      ]
    }
