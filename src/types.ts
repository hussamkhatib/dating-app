export type PolygonProperties = {
  [key: string]: any;
};

export type HoverInfoType = {
  property: {
    [key: string]: string | number;
  };
  x: number;
  y: number;
};

export type OnSelectCity = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => void;
