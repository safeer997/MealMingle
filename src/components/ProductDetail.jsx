import {
  Box,
  CardMedia,
  Typography,
  Rating,
  IconButton,
  Card,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fav, setFav] = useState(false);

  const restaurant = location.state?.restaurant || {
    restaurant_name: 'Lazy Bear',
    address_complete: 'Connaught Place, New Delhi',
    logo: 'https://via.placeholder.com/400x300?text=Restaurant',
  };

  const toggleFavorite = () => {
    console.log('Toggling favorite:', !fav);
    setFav(!fav);
  };

  return (
    <Box sx={{ pb: 3, bgcolor: '#fff' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1.5,
          bgcolor: 'white',
          borderBottom: '1px solid #f0f0f0',
          zIndex: 100,
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ p: 0.5 }}>
          <ArrowBackIcon sx={{ fontSize: 24, color: '#1a1a1a' }} />
        </IconButton>
        <IconButton onClick={toggleFavorite} sx={{ p: 0.5 }}>
          {fav ? (
            <FavoriteIcon sx={{ fontSize: 24, color: '#ff6b6b' }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 24, color: '#1a1a1a' }} />
          )}
        </IconButton>
      </Box>

      <CardMedia
        component='img'
        image={restaurant.logo || 'https://via.placeholder.com/400x300'}
        alt={restaurant.restaurant_name}
        sx={{ width: '100%', height: 250, objectFit: 'cover' }}
      />

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: '700',
                color: '#1a1a1a',
                mb: 0.3,
              }}
            >
              {restaurant.restaurant_name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#999', fontWeight: '400' }}>
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
            <Typography sx={{ fontSize: 13, fontWeight: '700' }}>
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
            mb: 2,
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
            py: 1.5,
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Typography sx={{ fontSize: 13, color: '#999', fontWeight: '400' }}>
            📍 {restaurant.address_complete}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: '700', flexShrink: 0 }}>
            ₹ 200
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          sx={{
            fontSize: 14,
            color: '#555',
            mt: 2,
            lineHeight: 1.6,
            fontWeight: '400',
          }}
        >
          Our delicate vanilla cake swirled with chocolate and filled with mocha
          chocolate chip cream and a layer of dark chocolate ganache
        </Typography>
        <Card
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: '#f5f5f5',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            boxShadow: 'none',
          }}
        >
          <Typography sx={{ fontSize: 13, color: '#999', fontWeight: '400' }}>
            Available for delivery
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductDetail;
