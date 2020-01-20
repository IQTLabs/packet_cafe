import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Checkbox } from 'semantic-ui-react'

export default class TermsOfServiceModal extends Component {
  state = { 
    modalOpen: false,
    checked: false 
  }

  handleModalClose = e => {
    this.props.modalAction && this.props.modalAction(e);
  }

  handleTerms = e => {
    this.props.termsAction && this.props.termsAction(e);
  }

  handleCheckedToggle  = () => this.setState(
    (prevState) => ({ 
      checked: !prevState.checked 
    })
  )

  render() {
    return (
      <Modal
        open={this.props.openState}
        onClose={this.handleModalClose}
        size="small"
      >
        <Modal.Header>Terms of Service</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <Header>Section A</Header>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu est imperdiet, tempor justo id, feugiat eros. Sed aliquet magna ultrices tellus maximus, sed euismod libero faucibus. Sed semper pharetra pretium. Nam a eros non metus vestibulum commodo. Phasellus eu eros id magna sodales dictum. Nunc quam eros, euismod a lacinia non, varius sed urna. Mauris ligula elit, rhoncus at nisl nec, volutpat faucibus neque. Sed volutpat, quam nec vestibulum interdum, leo ligula euismod risus, in sagittis turpis felis vitae odio. Nulla vulputate imperdiet sagittis. Integer elementum a dui et pulvinar.
              </p>
              <p>
                Pellentesque ut ullamcorper massa. Donec tristique fringilla massa vitae feugiat. Aliquam lacinia a urna quis maximus. Suspendisse lobortis vestibulum lectus eleifend semper. Quisque quis vehicula enim. Aliquam nisl mi, pulvinar sed interdum varius, rhoncus at nisi. Phasellus vitae gravida nunc. Nullam condimentum velit orci. Vivamus sollicitudin dictum accumsan. Vivamus sit amet quam urna. Cras non tellus nulla. Nunc a lacus aliquam, ultrices elit in, luctus turpis.
              </p>
              <p>
                Nunc at metus sit amet dui blandit laoreet. Aliquam consequat tincidunt gravida. Vestibulum ac posuere est, eu fringilla odio. Nunc nec magna nec velit lobortis congue eu sit amet odio. Nunc eleifend facilisis dictum. Duis eget est vel elit viverra placerat. Mauris mollis feugiat rhoncus.
              </p>
              <Header>Section B</Header>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu est imperdiet, tempor justo id, feugiat eros. Sed aliquet magna ultrices tellus maximus, sed euismod libero faucibus. Sed semper pharetra pretium. Nam a eros non metus vestibulum commodo. Phasellus eu eros id magna sodales dictum. Nunc quam eros, euismod a lacinia non, varius sed urna. Mauris ligula elit, rhoncus at nisl nec, volutpat faucibus neque. Sed volutpat, quam nec vestibulum interdum, leo ligula euismod risus, in sagittis turpis felis vitae odio. Nulla vulputate imperdiet sagittis. Integer elementum a dui et pulvinar.
              </p>
              <p>
                Pellentesque ut ullamcorper massa. Donec tristique fringilla massa vitae feugiat. Aliquam lacinia a urna quis maximus. Suspendisse lobortis vestibulum lectus eleifend semper. Quisque quis vehicula enim. Aliquam nisl mi, pulvinar sed interdum varius, rhoncus at nisi. Phasellus vitae gravida nunc. Nullam condimentum velit orci. Vivamus sollicitudin dictum accumsan. Vivamus sit amet quam urna. Cras non tellus nulla. Nunc a lacus aliquam, ultrices elit in, luctus turpis.
              </p>
              <p>
                Nunc at metus sit amet dui blandit laoreet. Aliquam consequat tincidunt gravida. Vestibulum ac posuere est, eu fringilla odio. Nunc nec magna nec velit lobortis congue eu sit amet odio. Nunc eleifend facilisis dictum. Duis eget est vel elit viverra placerat. Mauris mollis feugiat rhoncus.
              </p>
              <Header>Section C</Header>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu est imperdiet, tempor justo id, feugiat eros. Sed aliquet magna ultrices tellus maximus, sed euismod libero faucibus. Sed semper pharetra pretium. Nam a eros non metus vestibulum commodo. Phasellus eu eros id magna sodales dictum. Nunc quam eros, euismod a lacinia non, varius sed urna. Mauris ligula elit, rhoncus at nisl nec, volutpat faucibus neque. Sed volutpat, quam nec vestibulum interdum, leo ligula euismod risus, in sagittis turpis felis vitae odio. Nulla vulputate imperdiet sagittis. Integer elementum a dui et pulvinar.
              </p>
              <p>
                Pellentesque ut ullamcorper massa. Donec tristique fringilla massa vitae feugiat. Aliquam lacinia a urna quis maximus. Suspendisse lobortis vestibulum lectus eleifend semper. Quisque quis vehicula enim. Aliquam nisl mi, pulvinar sed interdum varius, rhoncus at nisi. Phasellus vitae gravida nunc. Nullam condimentum velit orci. Vivamus sollicitudin dictum accumsan. Vivamus sit amet quam urna. Cras non tellus nulla. Nunc a lacus aliquam, ultrices elit in, luctus turpis.
              </p>
              <p>
                Nunc at metus sit amet dui blandit laoreet. Aliquam consequat tincidunt gravida. Vestibulum ac posuere est, eu fringilla odio. Nunc nec magna nec velit lobortis congue eu sit amet odio. Nunc eleifend facilisis dictum. Duis eget est vel elit viverra placerat. Mauris mollis feugiat rhoncus.
              </p>
              <Header>Section D</Header>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu est imperdiet, tempor justo id, feugiat eros. Sed aliquet magna ultrices tellus maximus, sed euismod libero faucibus. Sed semper pharetra pretium. Nam a eros non metus vestibulum commodo. Phasellus eu eros id magna sodales dictum. Nunc quam eros, euismod a lacinia non, varius sed urna. Mauris ligula elit, rhoncus at nisl nec, volutpat faucibus neque. Sed volutpat, quam nec vestibulum interdum, leo ligula euismod risus, in sagittis turpis felis vitae odio. Nulla vulputate imperdiet sagittis. Integer elementum a dui et pulvinar.
              </p>
              <p>
                Pellentesque ut ullamcorper massa. Donec tristique fringilla massa vitae feugiat. Aliquam lacinia a urna quis maximus. Suspendisse lobortis vestibulum lectus eleifend semper. Quisque quis vehicula enim. Aliquam nisl mi, pulvinar sed interdum varius, rhoncus at nisi. Phasellus vitae gravida nunc. Nullam condimentum velit orci. Vivamus sollicitudin dictum accumsan. Vivamus sit amet quam urna. Cras non tellus nulla. Nunc a lacus aliquam, ultrices elit in, luctus turpis.
              </p>
              <p>
                Nunc at metus sit amet dui blandit laoreet. Aliquam consequat tincidunt gravida. Vestibulum ac posuere est, eu fringilla odio. Nunc nec magna nec velit lobortis congue eu sit amet odio. Nunc eleifend facilisis dictum. Duis eget est vel elit viverra placerat. Mauris mollis feugiat rhoncus.
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Checkbox
              label='I accept these terms and conditions'
              onChange={this.handleTerms}
              // checked={this.state.checked}
              checked={this.props.termsState}
            />
            {this.props.termsState &&
              <Button onClick={this.handleModalClose} primary >
                Proceed <Icon name='chevron right' />
              </Button>
            }
            {!this.props.termsState &&
              <Button primary disabled>
                Proceed <Icon name='chevron right' />
              </Button>
            }
          </Modal.Actions>
      </Modal>
    )
  }
}