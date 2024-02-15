import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MultiCarousel.css'
import Rating from '@mui/material/Rating';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

const MultiCarousel = ({ items }) => {
  // console.log(process.env.BASIC_URL);

  return (
    <div className='my-10'>
      {/* <div className='border-b-2'>
        qwe
      </div> */}
      <Carousel
        additionalTransfrom={0}
        arrows={true}
        autoPlay={false}
        autoPlaySpeed={5000}
        centerMode={false}
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 5,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 3,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass="p-5"
        slidesToSlide={5}
      >
        {items.map(item => (
          <Link to={`/product/${item.shop}/${item.id}`} key={item.id} className='flex items-start flex-col mx-2'>
            <LazyLoad>
              <img src={item.thumbnail} className=' h-52 text-center block ml-auto mr-auto p-2 ' />
              {/* h-40 w-40 text-center block ml-auto mr-auto p-2 */}
            </LazyLoad>
            <h5>{item.price} €</h5>
            <h6>{item.title}</h6>
            <span>{item.seller}</span>
            <Rating name="half-rating-read" defaultValue={item.rating} precision={0.1} readOnly />
          </Link>
        ))}
      </Carousel>
    </div>
  )
}

export default MultiCarousel