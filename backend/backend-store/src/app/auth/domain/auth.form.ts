import { IsEmail, IsNotEmpty, IsString, validate } from 'class-validator';

export class AuthForm {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  static async validate(form: AuthForm) {
    const errors = await validate(form);
    return errors.length ? errors : false;
  }

  static from(form: AuthForm) {
    if (!form) {
      return;
    }
    const it = new AuthForm();
    it.email = form.email;
    it.password = form.password;
    return it;
  }
}
