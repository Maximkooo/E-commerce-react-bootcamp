import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

const CardItem = ({ item }) => {

  const lastPrice = () => {
    return (item.price + item.price * 0.1).toFixed(2)
  }
  const sliceDescription = (description) => {
    const lastIndex = description.lastIndexOf(' ', 60);
    return description.slice(0, lastIndex) + '...'
  }

  const sliceTitle = (title) => {
    const lastIndex = title.lastIndexOf(' ', 20);
    return title.slice(0, lastIndex) + '...'
  }
  // console.log(item);
  return (
    <div className="p-10">
      {item && (
        <Link to={`/product/${item.shop}/${item.id}`}>
          <Card sx={{ maxWidth: 305 }}>
            <CardActionArea className='h-96'>
              <LazyLoad >
                <CardMedia>
                  <img src={item.image} className=' h-48 text-center block ml-auto mr-auto p-2' />
                </CardMedia>
              </LazyLoad>
              <CardContent>
                <Typography variant="h6" >
                  Just <span className='primary-color font-bold'>{item.price}€</span>
                </Typography>
                <Typography >
                  Last price <span className='line-through'>{lastPrice()}€</span>
                </Typography>
                <Typography gutterBottom >
                  <span className='font-bold'>{sliceTitle(item.title)}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {sliceDescription(item.description)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      )}

    </div>
  )
}

export default CardItem