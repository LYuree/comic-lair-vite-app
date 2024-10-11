import React, { useState } from 'react'
import Container from "./Container";

const HomeBanner = () => {
    const slides = [
        "/src/images/banner1.webp",
        "/src/images/banner1.webp",
        "/src/images/banner1.webp"
    ]
    return (
    <div>
        <Container>
            <div className="mt-4">
                <a href="#">
                    <picture>
                        <source
                            type="image/webp"
                        />
                        <img src="/src/images/banner1.webp" alt="" />
                    </picture>
                    {/* <Image src={banner1}
                    width={1160}
                    height={475}
                    alt="Первые выпуски Grim Horse - бесплатно!"
                    /> */}
                </a>
            </div>
        </Container>
    </div> );
}
 
export default HomeBanner;