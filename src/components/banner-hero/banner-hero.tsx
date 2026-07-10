import './banner-hero.css'
import { useState } from "react";
import Button, { type ColorToken } from "../form/button/Button";

const DEFAULT_FALLBACK_IMAGE_SRC =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23e8f3ec'/%3E%3Cstop offset='100%25' stop-color='%23d7e6dc'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='800' fill='url(%23g)'/%3E%3C/svg%3E";

export interface BannerHeroProps {
    title?: string;
    description?: string;
    imageBackgroundDesktop?: string; // banner-desktop.webp   ca. 2400 × 1200
    imageBackgroundTablet?: string;  // banner-tablet.webp    ca. 1600 × 1000
    imageBackgroundMobile?: string;  // banner-mobile.webp    ca. 900 × 1200
    fallbackImageSrc?: string;
    colorToken?: BannerColorToken;
    labelButtonPrimary?: string;
    actionButtonPrimary?(): void;
    labelButtonSecondary?: string;
    actionButtonSecondary?(): void;
}

export type BannerColorToken =
    | "--color-juice-sugarcane"
    | "--color-juice-tamarind"
    | "--color-juice-guarana"
    | "--color-juice-icetea"
    | "--color-text-light"
    | "--color-text-dark";

const isButtonColorToken = (token?: BannerColorToken): token is ColorToken =>
    token === "--color-juice-sugarcane" ||
    token === "--color-juice-tamarind" ||
    token === "--color-juice-guarana" ||
    token === "--color-juice-icetea";


/**
 * banner-desktop.webp   ca. 2400 × 1200
 * banner-tablet.webp    ca. 1600 × 1000
 * banner-mobile.webp    ca. 900 × 1200
 *
 Wann brauchst du ein anderes Mobile-Bild?

 Du brauchst ein eigenes Mobile-Bild, wenn:
 wichtige Personen, Produkte oder Flaschen am Rand stehen
 Text im Bild enthalten ist
 das Hauptmotiv sonst abgeschnitten wird
 du auf Mobile einen anderen Bildausschnitt brauchst

 Bei Produktbildern wie Getränkedosen oder Flaschen lohnt sich ein eigenes Mobile-Crop fast immer.
 */
export default function BannerHero({
   title,
   description,
   colorToken,
   imageBackgroundDesktop,
   imageBackgroundTablet,
   imageBackgroundMobile,
   fallbackImageSrc,
   labelButtonPrimary,
   actionButtonPrimary,
   labelButtonSecondary,
   actionButtonSecondary,
}: BannerHeroProps) {
   const [failedSourceKey, setFailedSourceKey] = useState<string | null>(null);

   const imageSrcDesktop = imageBackgroundDesktop?.trim();
   const imageSrcTablet = imageBackgroundTablet?.trim();
   const imageSrcMobile = imageBackgroundMobile?.trim();
   const imageSrcFallback = fallbackImageSrc?.trim() || DEFAULT_FALLBACK_IMAGE_SRC;
   const sourceKey = [imageSrcDesktop, imageSrcTablet, imageSrcMobile].filter(Boolean).join("|");
   const shouldUseBackgroundImage = Boolean(imageSrcDesktop) && failedSourceKey !== sourceKey;
   const buttonColorToken = isButtonColorToken(colorToken) ? colorToken : undefined;

   const imageSrcSet = shouldUseBackgroundImage
       ? [imageSrcMobile ? `${imageSrcMobile} 900w` : "", imageSrcTablet ? `${imageSrcTablet} 1600w` : "", `${imageSrcDesktop} 2400w`]
             .filter(Boolean)
             .join(", ")
       : undefined;

   return (
       <div className="content-child-max banner-hero">
           <div className="hero__container">
               <img
                   src={shouldUseBackgroundImage ? imageSrcDesktop : imageSrcFallback}
                   srcSet={imageSrcSet}
                   sizes={imageSrcSet ? "100vw" : undefined}
                   className="image-banner"
                   alt="background"
                   onError={shouldUseBackgroundImage ? () => setFailedSourceKey(sourceKey) : undefined}
               />

               <div
                   className="hero__content"
                    style={colorToken ? { color: `var(${colorToken})` } : undefined}
                >
                    {title && title.split('\n').map((line, index) => (
                        <span key={index} className={`banner--title ${colorToken ? colorToken : ''}`} data-testid="bannerHeroTitle">
                            {line}
                            {index < title.split('\n').length - 1 && <br />}
                        </span>
                    ))}

                    <p className="banner--description">
                        {description && description.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                {index < description.split('\n').length - 1 && <br />}
                            </span>
                        ))}
                    </p>

                    <div className="banner-hero-buttonbar">
                        {labelButtonPrimary &&
                            <Button
                                label={labelButtonPrimary}
                                variant="primary"
                                colorToken={buttonColorToken}
                                onClick={actionButtonPrimary}
                            />
                        }
                        {labelButtonSecondary &&
                            <Button
                                label={labelButtonSecondary}
                                variant="secondary"
                                onClick={actionButtonSecondary}
                            />
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
