export class ContentBuilderConfig {
  lang: string = '';

  constructor(config?: Partial<ContentBuilderConfig>) {
    this.lang = config?.lang ?? this.lang;
  }
}
