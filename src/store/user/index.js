import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      user: {},
      credentials: {
        login: '',
        password: '',
      },
      token: '',
      waiting: false,
      error: null,
      isAuth: false,
    };
  }

  setCredentials(newCredentials) {
    const credentials = { ...this.getState().credentials, ...newCredentials };
    this.setState(
      {
        ...this.getState(),
        credentials,
      },
      'Логин или пароль изменены'
    );
  }

  async login() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.getState().credentials),
      });
      const { error, result } = await response.json();
      if (error) {
        const msg = error.data.issues[0].message;
        throw new Error(msg);
      }

      if (result) {
        this.setUser(result);
        localStorage.setItem('token', result.token);
      }
    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          error: err.message,
          waiting: false,
        },
        'Ошибка при логине'
      );
    }
  }

  setUser({ user, token }) {
    const {
      email,
      _id,
      profile: { name, phone },
    } = user;

    this.setState(
      {
        ...this.getState(),
        error: null,
        isAuth: true,
        waiting: false,
        user: {
          email,
          _id,
          name,
          phone,
        },
        token,
        credentials: {
          login: '',
          password: '',
        },
      },
      'User data updated successfully'
    );
  }

  async checkUser() {
    let token = this.getState().token || localStorage.getItem('token');

    if (token) {
      const response = await fetch('/api/v1/users/self', {
        headers: { 'Content-Type': 'application/json', 'X-Token': token },
      });
      const { result } = await response.json();
      this.setUser({ user: result, token });
    }
  }
}

export default UserState;
