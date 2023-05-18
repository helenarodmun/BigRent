
import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react';
import { Button, Card, Container, Form, Row } from "react-bootstrap"


export default function LogIn() {
  const { errors } = usePage().props;

  const [values, setForm] = useState({
    username: "",
    password: "",
    remember: ""
  })

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setForm(values => ({
      ...values,
      [key]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    router.post('/login', values)
  }

  return (
    <>
      <Container className='mt-5'>
        <Row className="justify-content-center ">
          <div className="col-md-8 pb-4">
            <Card className="shadow rounded">
              <Card.Header className="bg-warning bg-opacity-50"><strong>INICIO DE SESIÓN</strong></Card.Header>
              <Card.Body>

                <Form method="POST" onSubmit={handleSubmit}>
                  {/* Email */}
                  <Form.Group>
                    <div className="row mb-3">
                      <label htmlFor="username" className="col-md-4 col-form-label text-md-end"><strong>Usuario</strong></label>
                      <div className="col-md-6">
                        <Form.Control
                          className={errors.username ? 'is-invalid' : ''}
                          id="username"
                          type="username"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          autoComplete="username"
                          autoFocus
                          required
                          placeholder="Introduzca el nombre de usuario"
                        />
                        {errors.username &&
                          <span className="text-danger">{errors.username}</span>
                        }
                      </div>
                    </div>
                  </Form.Group>

                  <div className="row mb-3">
                    {/* Password */}
                    <Form.Group>
                      <div className="row mb-3">
                        <Form.Label htmlFor="password" className="col-md-4 col-form-label text-md-end"><strong>Contraseña</strong></Form.Label>
                        <div className="col-md-6">
                          <Form.Control
                            id="password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            autoComplete="password"
                            required
                            placeholder="Introduzca la contraseña"
                          />
                          {errors.password &&
                            <span className="text-danger">{errors.password}</span>
                          }
                        </div>
                      </div>
                    </Form.Group>
                  </div>

                  {/* Recuerdame */}
                  <div className="row mb-3">
                    <div className="col-md-6 offset-md-4">
                      <Form.Group>
                        <Form.Check
                          name="remember"
                          label="Recordar"
                          value={values.remember}
                          onChange={handleChange}
                        />
                        {errors.remember && <div><strong>{errors.remember}</strong></div>}
                      </Form.Group>
                    </div>

                  </div>

                  {/* Submit */}
                  <div className="row mb-0">
                    <div className="col-md-8 offset-md-4">
                      <Button type="submit" className="btn btn-primary">Iniciar sesión</Button>
                      {/* <Link className="btn btn-link" href="/password/reset">Forgot your password?</Link>
                      <div className="pt-3">
                        <span>Don't have an account yet?
                          <Link className="text-center p-2" href="/register">
                            Sign up!
                          </Link>
                        </span>
                      </div> */}
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}