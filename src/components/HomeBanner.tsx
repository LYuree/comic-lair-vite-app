import React, { useState } from 'react'
import Container from "./Container";

const HomeBanner = () => {
    const slides = [
        "/src/images/banner1.webp",
        "/src/images/banner1.webp",
        "/src/images/banner1.webp"
    ]
    return (
    <div className='max-w-[1160px] w-full mx-auto'>
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
    </div> );
}
 
export default HomeBanner;