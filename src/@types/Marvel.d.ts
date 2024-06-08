interface MarvelApi<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<T>;
}

interface Characters {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    collectionURI: string;
  };
  series: {
    available: number;
    collectionURI: string;
  };
}

interface Comics {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface Series {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
