export class Mensajes
{
  public de: string;
  public cuerpo: string;
  constructor( de: string, cuerpo: string )
  {
    this.de = de;
    this.cuerpo = cuerpo;
  }
}
// esto podria resumirse asi
// export class Mensajes
// {
//   constructor(public de: string, public cuerpo: string) {}
// }
