export default class EmailValidator {
  public static isValid(email: string): boolean {
    if (!email) {
      return false;
    }
    return (
      email
        .toLocaleLowerCase()
        .match(
          /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
        ) !== null
    );
  }
}
