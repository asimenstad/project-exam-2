import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

/**
 * Carousel with venue images.
 * @param {Array} media - The URLs for the venue media.
 * @returns Carousel.
 */
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
    <Box my={2}>
      <Box
        sx={{
          backgroundImage: `url(${selectedMedia && selectedMedia})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: { xs: "400px", sm: "500px", md: "600px" },
          mb: 1,
        }}
      />
      {media && media.length > 1 && (
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
                    height: { xs: "150px", sm: "200px" },
                    width: "100%",
                    cursor: "pointer",
                    opacity: selectedIndex === index && 0.7,
                  }}
                  ref={(el) => (carouselRef.current[index] = el)}
                />
              ))}
          </Box>
          <IconButton
            onClick={handleLeftClick}
            sx={{ position: "absolute", zIndex: 100, top: "40%", left: 1, color: "#000" }}>
            <ArrowBackIosNewRounded />
          </IconButton>
          <IconButton
            onClick={handleRightClick}
            sx={{ position: "absolute", zIndex: 100, top: "40%", right: 1, color: "#000" }}>
            <ArrowForwardIosRounded />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default MediaCarousel;
