import GlobalResponse from "@/core/models/GlobalResponse";

interface MethodFactory {
  [K: string]: (...args: any) => Promise<any>;
}

// The base class that every module service will implement
export default abstract class GlobalService {
  abstract readonly methods: MethodFactory;
}
