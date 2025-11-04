import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ res }) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    // console.log('Navigating to restaurant:', res.restaurant_id);
    navigate(`/restaurant/${res.restaurant_id}`, {
      state: { restaurant: res },
    });
  };

  const extractCity = (addr) => {
    if (!addr || addr === 'null') {
      return 'Location';
    }
    const parts = addr.split(',');
    return parts.length >= 2 ? parts[parts.length - 2].trim() : 'Location';
  };

  const cityName = extractCity(res.address_complete);

  return (
    <Card
      onClick={onCardClick}
      sx={{
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: 'none',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardMedia
        component='img'
        image='https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60'
        alt={res.restaurant_name}
        sx={{ width: 160, height: 180, objectFit: 'cover' }} 
      />

      <CardContent sx={{ p: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
            mb: 0.8,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: '700',
                color: '#1a1a1a',
                mb: 0.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {res.restaurant_name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#999', fontWeight: '400' }}>
              Cakes, Pastry, Pastas
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.3,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{ fontSize: 13, fontWeight: '700', color: '#1a1a1a' }}
            >
              4.5
            </Typography>
            <Rating
              value={4.5}
              readOnly
              size='small'
              sx={{ '& .MuiRating-icon': { fontSize: 16 } }}
            />
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 12,
            color: '#ff6b6b',
            mb: 1.2,
            display: 'flex',
            alignItems: 'center',
            gap: 0.4,
            fontWeight: 500,
          }}
        >
          🔥 4 Offers trending
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
              minWidth: 0,
              flex: 1,
            }}
          >
            <Typography sx={{ fontSize: 12, color: '#999', flexShrink: 0 }}>
              📍
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: '#999',
                fontWeight: 400,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {cityName}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: '700',
              color: '#1a1a1a',
              flexShrink: 0,
              ml: 1,
            }}
          >
            ₹ 200
          </Typography>
        </Box>

        <Typography
          sx={{ fontSize: 11, color: '#999', mt: 1, fontWeight: 500 }}
        >
          Popularity
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
