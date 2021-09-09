import React, { Component } from 'react'
import {
  Button, Form, Input, Select, 
  Divider, Grid, Segment
} from 'semantic-ui-react'

const baseRoleSelect = [
  { key: 'observer', text: 'Observer', value: 'observer' },
  { key: 'manager', text: 'Manager', value: 'user' },
  { key: 'admin', text: 'Admin', value: 'admin' },
]

const teamRoleSelect = [
  { key: 'responder', text: 'Responder', value: 'responder' },
  { key: 'manager', text: 'Manager', value: 'manager' }
]

const teamSelect = [
  { key: 'development', text: 'development', value: 'development' },
  { key: 'networks', text: 'networks', value: 'networks' },
  { key: 'amp', text: 'amp', value: 'amp' },
  { key: 'pcf', text: 'pcf', value: 'pcf' }
]

class UserForm extends Component {
  state = { fullname: '',     email: '',    baseRole: '',
            countryCode: '',  phonenumber: '', 
            team: '',         teamRole: '', jobTitle: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { fullname, email, baseRole, countryCode, phonenumber, 
            team, teamRole, jobTitle } = this.state

    const data = JSON.stringify({ 
      user:  { 	
        type      : "user",
        name      : fullname,
        email     : email,
        role      : baseRole,
        job_title : jobTitle
      },

      phone_contact_method: {
        type          : "phone_contact_method",
        country_code  : countryCode,
        address       : phonenumber,
        label         : "Work"
      },

      sms_contact_method: {
        type          : "sms_contact_method",
        country_code  : countryCode,
        address       : phonenumber,
        label         : "Work"
      },

      team  : team,
      role  : teamRole
    });

    /*
    fetch('https://events.pagerduty.com/v2/enqueue', {
      method: 'POST',
      body: data,
    });
    */

    fetch('https://webhook.site/a92bb3c3-9095-4f24-b92d-2c49cbbb6aca', {
      method: 'POST',
      body: data,
    });

    this.setState({ fullname: '',     email: '',    baseRole: '',
                    countryCode: '',  phonenumber: '',  
                    team: '',         teamRole: '', jobTitle: '',})
}

  render() {
    const { fullname, email, baseRole, countryCode, phonenumber, 
            team, teamRole, jobTitle } = this.state

    return (


      <Form onSubmit={this.handleSubmit}>
        <Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <Form.Field
                control={Input}
                name='fullname'
                value={fullname}
                label='Full Name'
                placeholder='e.g. John Smith'
                onChange={this.handleChange}
                required
              />
              <Form.Field
                control={Input}
                name='email'
                value={email}
                label='Email Address'
                placeholder='Enter Email Address'
                onChange={this.handleChange}
                required
                //error={{
                //  content: 'Please enter a valid email address',
                //  pointing: 'above',
                //}}
              />
              <Form.Group widths='equal'>
                  <Form.Field
                  control={Input}
                  name='countryCode'
                  value={countryCode}
                  label='Code'
                  placeholder='eg: 61'
                  onChange={this.handleChange}
                  width={6}
                  required
                />
                <Form.Field
                  control={Input}
                  name='phonenumber'
                  value={phonenumber}
                  label='Phone Number'
                  placeholder='e.g. 0400123456'
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Field
                  control={Input}
                  name='jobTitle'
                  value={jobTitle}
                  label='Job Title'
                  placeholder='optional'
                  onChange={this.handleChange} 
                />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Select}
                name='baseRole'
                value={baseRole}
                label="User's Base Role"
                options={baseRoleSelect}
                placeholder='Select User Role'
                onChange={this.handleChange}
                required
              />
              <Form.Field
                control={Select}
                name='team'
                value={team}
                label='Team'
                options={teamSelect}
                placeholder='Select Team'
                onChange={this.handleChange}
                required
              />
              <Form.Field
                control={Select}
                name='teamRole'
                value={teamRole}
                label="User's Team Role"
                options={teamRoleSelect}
                placeholder='Select Team Role'
                onChange={this.handleChange}
                required
              />
            </Grid.Column>
          </Grid>
          <Divider vertical>and</Divider>
        </Segment>

          
          
        <Form.Field control={Button}>Create User</Form.Field>
      </Form>
    )
  }

}

export default UserForm;
