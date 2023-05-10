
import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react';
import { Button, Card, Container, Form, Row } from "react-bootstrap"


export default function FormRegistro() {
  const { errors } = usePage().props;


  const [values, setForm] = useState({
    username: "",
    password: "",
    password_confirmation: ""
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
    console.log(values)
    router.post('/register', values)
  }

  return (
    <>
      <Navigation />

      <Container>
        <Row className="justify-content-center">
          <div className="col-md-8 pb-4">
            <Card>
              <Card.Header>Registro de usuarios</Card.Header>
              <Card.Body>
                <Form method="POST" onSubmit={handleSubmit}>

                  {/* Name */}
                  <Form.Group>
                    <div className="row mb-3">
                      <Form.Label htmlFor="username" className="col-md-4 col-form-label text-md-end">Username</Form.Label>
                      <div className="col-md-6">
                        <Form.Control
                          id="username"
                          type="username"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          autoComplete="username"
                          autoFocus
                          required
                          placeholder="Usuario"
                        />
                        {errors.username &&
                          <span className="text-danger">{errors.username}</span>
                        }
                      </div>

                    </div>

                  </Form.Group>
                  {/* Password */}
                  <Form.Group>
                    <div className="row mb-3">
                      <Form.Label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</Form.Label>
                      <div className="col-md-6">

                        <Form.Control
                          id="password"
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          autoComplete="password"
                          placeholder="Enter your password *"
                          required
                        />
                        {errors.password &&
                          <span className="text-danger">{errors.password}</span>
                        }
                      </div>

                    </div>
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group>
                    <div className="row mb-3">
                      <Form.Label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">Password</Form.Label>
                      <div className="col-md-6">
                        <Form.Control
                          id="password_confirmation"
                          type="password"
                          name="password_confirmation"
                          value={values.password_confirmation}
                          onChange={handleChange}
                          autoComplete="password_confirmation"
                          placeholder="Confirm your password *"
                          required
                        />
                        {errors.password_confirmation &&
                          <span className="text-danger">{errors.password_confirmation}</span>
                        }
                      </div>

                    </div>
                  </Form.Group>

                  {/* Submit */}
                  <div class="col-md-8 offset-md-4">
                    <Button type="submit" className="btn btn-primary">Registrar</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>

      <Footer />
    </>
  )
}