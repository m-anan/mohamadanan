import GlobalService from "../api/service/GlobalService";

export default function useGlobalService<T extends GlobalService>(type: {
  new (): T;
}): T {
  const instance = new type();

  return instance;
}
