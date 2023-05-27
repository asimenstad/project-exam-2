import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function MediaCarousel({ media }) {
  const [selectedMedia, setSelectedMedia] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef([]);

  useEffect(() => {
    if (media && media[0]) {
      carouselRef.current = carouselRef.current.slice(0, media.length);
      setSelectedMedia(media[0]);
      setSelectedIndex(0);
    }
  }, [media]);

  const handleSelectChange = (newIndex) => {
    if (media && media.length > 0) {
      setSelectedMedia(media[newIndex]);
      setSelectedIndex(newIndex);
      if (carouselRef.current[newIndex]) {
        carouselRef.current[newIndex].scrollTo({
          inline: "center",
          behavior: "smooth",
          alignToTop: false,
        });
      }
    }
  };

  const handleRightClick = () => {
    if (media && media.length > 0) {
      let newIndex = selectedIndex + 1;
      if (newIndex >= media.length) {
        newIndex = 0;
      }
      handleSelectChange(newIndex);
    }
  };

  const handleLeftClick = () => {
    if (media && media.length > 0) {
      let newIndex = selectedIndex - 1;
      if (newIndex < 0) {
        newIndex = media.length - 1;
      }
      handleSelectChange(newIndex);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${selectedMedia && selectedMedia})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "500px",
          mb: 1,
        }}
      />
      <Box sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", gap: 1, maxWidth: "100%", overflowX: "hidden" }}>
          {media &&
            media.map((image, index) => (
              <Box
                key={media + index}
                onClick={() => handleSelectChange(index)}
                sx={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "150px",
                  width: "100%",
                  cursor: "pointer",
                  opacity: selectedIndex === index && { opacity: 0.5 },
                }}
                ref={(el) => (carouselRef.current[index] = el)}
              />
            ))}
        </Box>
        <IconButton onClick={handleLeftClick}>
          <ArrowBackIosNewRounded />
        </IconButton>
        <IconButton onClick={handleRightClick}>
          <ArrowForwardIosRounded />
        </IconButton>
      </Box>
    </Box>
  );
}

export default MediaCarousel;
