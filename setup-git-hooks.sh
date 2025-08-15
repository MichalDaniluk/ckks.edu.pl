#!/bin/bash

# Script to setup Git hooks for the project
# Run this script to install Git hooks for all team members

echo "🔧 Setting up Git hooks..."

# Create pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

# Pre-push hook to run tests before pushing to repository
# This script will prevent push if tests fail

echo "🔍 Running tests before push..."

# Check if package.json exists (to determine if this is a Node.js project)
if [ ! -f "package.json" ]; then
    echo "❌ No package.json found, skipping tests"
    exit 0
fi

# Check if we have yarn.lock or package-lock.json to determine package manager
if [ -f "yarn.lock" ]; then
    PACKAGE_MANAGER="yarn"
    TEST_CMD="yarn test"
elif [ -f "package-lock.json" ]; then
    PACKAGE_MANAGER="npm"
    TEST_CMD="npm test"
else
    echo "❌ No lock file found, using npm as default"
    PACKAGE_MANAGER="npm"
    TEST_CMD="npm test"
fi

echo "📦 Using $PACKAGE_MANAGER as package manager"

# Run tests
echo "🧪 Running tests with: $TEST_CMD"
$TEST_CMD

# Check if tests passed
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Tests failed! Push rejected."
    echo "🔧 Please fix the failing tests before pushing."
    echo ""
    exit 1
fi

echo "✅ All tests passed! Proceeding with push..."
echo ""

exit 0
EOF

# Make hook executable
chmod +x .git/hooks/pre-push

echo "✅ Git hooks installed successfully!"
echo ""
echo "ℹ️  The pre-push hook will now:"
echo "   • Run tests before every git push"
echo "   • Block push if tests fail"
echo "   • Allow push only if all tests pass"
echo ""
echo "🚀 You're all set! Try making a push to test it."