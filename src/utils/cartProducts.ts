//I am changing the image links from firebase to amazon, firebase has issues with these direct links. Please remember to add the amazon link(that will show up at the error) instead of firebase at the cofig for it to work out.

export const cartProducts =
    {
      data: [
        {
          id: 1,
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
          reviews: ["review 1, review 2"],
        },
        {
          id: 2,
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
          reviews: ["review 1", "review 2"],
        },
        {
          id: 4,
          name: "A Ipsum-Man: The Long Way Home #1",
          description: "Short description",
          price: 2800,
          discount: .20,
          hit: null,
          releaseDate: "2024-03-01",
          brand: "Grim Horse",
          digital: true,
          categories: ["Электронная книга", "Комикс"],
          cover: "Мягкая обложка",
          amount: 1,
          images: [
            {
              image:
                  "../src/images/return-of-the-sit-amet-210-326.png",
            },
          ],
          reviews: [],
        },
        {
          id: 3,
          name: "Ipsum-Man: The Long Way Home #1",
          description: "Short description",
          price: 2750,
          discount: .20,
          hit: null,
          releaseDate: "2024-04-16",
          brand: "Grim Horse",
          digital: true,
          categories: ["Электронная книга", "Комикс"],
          cover: "Мягкая обложка",
          amount: 2,
          images: [
            {
              image:
                  "../src/images/return-of-the-sit-amet-210-326.png",
            },
          ],
          reviews: [],
        },
        {
          id: 5,
          name: "Ipsum-Man: The Long Way Home #1",
          description: "Short description",
          price: 2600,
          discount: .20,
          hit: null,
          releaseDate: "2024-01-28",
          brand: "Grim Horse",
          digital: false,
          categories: ["Печатная книга", "Комикс"],
          cover: "Мягкая обложка",
          amount: 1,
          images: [
            {
              image:
                  "../src/images/return-of-the-sit-amet-210-326.png",
            },
          ],
          reviews: [],
        },
        {
          id: 6,
          name: "Ipsum-Man: The Long Way Home #1",
          description: "Short description",
          price: 2400,
          discount: .15,
          hit: null,
          releaseDate: null,
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
