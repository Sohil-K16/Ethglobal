# 🏗️ Contributing to DecentralFund

We love your input! We want to make contributing to DecentralFund as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Local Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/project_crowdfunding-master.git
cd project_crowdfunding-master

# Run setup script
./setup.sh  # or setup.bat on Windows

# Start development
cd client && npm run dev
```

## Code Style

* Use 2 spaces for indentation
* Follow existing code patterns
* Add comments for complex logic
* Use meaningful variable names

### Smart Contract Guidelines

* Follow Solidity best practices
* Add comprehensive NatSpec documentation
* Include input validation
* Emit events for important state changes
* Write tests for all functions

### Frontend Guidelines

* Use functional components with hooks
* Implement proper error boundaries
* Follow React best practices
* Ensure responsive design
* Add loading states

## Issue Reporting

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We track feature requests as GitHub issues. When creating a feature request:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this feature would be useful
- Consider the scope and complexity

## Hackathon Contributions

During hackathons, we encourage:

- **Innovation**: Creative solutions to common problems
- **Documentation**: Clear explanations of features
- **Testing**: Robust testing of new functionality
- **Performance**: Optimization and efficiency improvements

## Areas for Contribution

### High Priority
- [ ] Multi-token support (USDC, DAI)
- [ ] Mobile responsiveness improvements
- [ ] Advanced search and filtering
- [ ] Campaign categories
- [ ] Social sharing integration

### Medium Priority
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Milestone-based funding
- [ ] NFT rewards for donors
- [ ] Campaign verification system

### Low Priority
- [ ] Dark mode theme
- [ ] Multiple language support
- [ ] Advanced user profiles
- [ ] Campaign recommendations
- [ ] Integration with social platforms

## Testing

### Smart Contract Testing
```bash
cd web3
npm run test
```

### Frontend Testing
```bash
cd client
npm run test
```

### Integration Testing
1. Deploy contracts to local network
2. Start frontend development server
3. Test complete user workflows

## Code Review Process

1. All submissions require review
2. We may suggest changes, improvements, or alternatives
3. Changes should be approved by maintainers
4. Once approved, we'll merge the PR

## Community

- Join our Discord: [invite-link]
- Follow us on Twitter: [@DecentralFund]
- Read our blog: [blog-link]

## Recognition

Contributors will be:
- Listed in our README
- Recognized in release notes
- Invited to our contributor community
- Eligible for future opportunities

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to DecentralFund! 🚀