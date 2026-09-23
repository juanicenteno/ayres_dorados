import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import "yet-another-react-lightbox/styles.css";
import "./Gallery.css";

export default function Gallery({ initialImages = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = initialImages;

  // Filtrado de imágenes
  const filteredImages = images.filter(
    (img) => activeCategory === "all" || img.category === activeCategory
  );

  // Paginación
  const IMAGES_PER_PAGE = 18;
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  // Reiniciar la paginación cada vez que cambie la categoría
  useEffect(() => {
    setVisibleCount(IMAGES_PER_PAGE);
  }, [activeCategory]);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = filteredImages.length > visibleCount;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + IMAGES_PER_PAGE, filteredImages.length));
  };

  // Filtros: "Todas" y "Habitaciones"
  const categoriesList = [
    { key: "all", label: "Todas" },
    { key: "rooms", label: "Habitaciones" },
  ];

  return (
    <div className="gallery_section_container">
      {/* Encabezado */}
      <header className="gallery_header">
        <span className="gallery_header_subtitle">Recorrido Visual</span>
        <h1 className="gallery_header_title">Galería de Fotos</h1>
      </header>

      {/* Barra de Filtros */}
      <nav className="filter_bar" aria-label="Categorías de la galería">
        {categoriesList.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            className={`filter_button ${activeCategory === cat.key ? "active" : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Grid de Miniaturas */}
      <div className="gallery_grid_container">
        {visibleImages.map((img, i) => (
          <article
            key={img.src}
            className="gallery_card"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <div className="thumbImage_container">
              <img
                src={img.src}
                alt={img.category === "rooms" ? "Habitación en Ayres Dorados Lodge" : "Ayres Dorados Lodge"}
                className="gallery_img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="gallery_card_overlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
            </div>
          </article>
        ))}
      </div>

      {/* Botón Cargar Más */}
      {hasMore && (
        <div className="load_more_container">
          <button type="button" className="load_more_button" onClick={loadMore}>
            Ver más fotos
          </button>
        </div>
      )}

      {/* Lightbox para ver a pantalla completa */}
      {open && (
        <Lightbox
          slides={filteredImages.map((img) => ({ src: img.src }))}
          plugins={[Download, Share, Slideshow]}
          index={index}
          open={open}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}
